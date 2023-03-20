import request from "../utils/request";
import { ITransition } from "./model/tranType";

 export const getTranlate = (data:ITransition)=>request.post("/trans/vip/translate",data)