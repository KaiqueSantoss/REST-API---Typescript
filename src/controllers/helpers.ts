import { HttpResponse, HttpStatusCode } from "./protocols"

export const ok = <T>(body: any): HttpResponse<T>=>({
    statusCode:HttpStatusCode.Ok,
    body:body
 })
 
export const created = <T>(body: any): HttpResponse<T>=>({
    statusCode:HttpStatusCode.CREATED,
    body:body
 })

export const badsRequests = (message:string): HttpResponse<string> =>{
    return{      
        statusCode:HttpStatusCode.BadRequest,
        body:message
    }
 } 

 export const serverError = (): HttpResponse<string> =>{
    return{      
        statusCode:HttpStatusCode.SERVER_ERROR,
        body:'Something went wrog.'
    }
 } 