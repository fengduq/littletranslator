import React, { useEffect, useRef, useState } from "react";
import "./Translate.css";
import { useTranslation } from 'react-i18next'
import { getTranlate } from "../../api/translate";
import md5 from "js-md5"
export default function Translate() {
    const [wordsNum, setWordsNum] = useState<String>("0");
    const [charNum, setCharNum] = useState<String>("0");
    const [flag, setFlag] = useState<Boolean>(true);
    const [zh,setZh] = useState<String>("")

    const { t, i18n } = useTranslation(['app'])

    // 定义ref
    const textRef = useRef<any>();
    // 信息统计
  const getMessInfo = ()=> {
        const message = textRef.current.value.trim();
        const arr = message.replace(/[\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "").split(/\s+/);
        arr.length = arr[0] ? arr.length : 0
        setWordsNum(arr.length);
        let count = 0
        let mes_len = message.length
        console.log(arr)
        for (let j = 0; j < mes_len; j++) {
            if (message.charAt(j) === "i") {
                count++
            }
        }
        setCharNum(count.toString())
    }
    // 中英互换
   const change =  async ()=> {
        setFlag(!flag)
        let data = {
            q:textRef.current.value.trim(),
            from: "en",
            to: "zh",
            appid:"20230319001605895",
            salt: Math.random().toString(),
            sign:""
        }
        let sign = md5(data.appid + data.q + data.salt + "rXTqeuYN126pDKjjNcpp");
        data.sign = sign
        let res:any = await getTranlate(data)
        console.log(res,"res")
        setZh(res[0].dst)
    }
    useEffect(() => {
        let language = flag ? "en" : "zh"
        i18n.changeLanguage(language)
        console.log("111", flag)
    }, [flag])
    return (
        <div className="wrapper">
            <div className="head">
                <span> {t('little')}  {t('translator')}</span>
                <button onClick={() => {
                    change()
                }}>{t('translate')}</button>
            </div>
            <div className="text">
                {t('input')}<input type="text" placeholder="input your words here" ref={textRef} onBlur={() => { getMessInfo() }} />
            </div>
            <div className="result">
                {zh}
            </div>
            <div className="messageInfo">
                {t('s')} {wordsNum} {t("w")} "i" {t('appears')} {charNum} {t('times')}
            </div>
        </div>
    );
}