import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en_US from './lang/en_US.json'
import zh_CN from './lang/zh_CN.json'
const resources = {
    en:en_US,
    zh:zh_CN
}
i18n.use(initReactI18next).init({
    resources,
    lng:'en',
    interpolation:{
        escapeValue:false
    }
})