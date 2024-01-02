
export interface HttpResponse<T>{
    statusCode:HttpStatusCode;
    body: T;
}

export interface HttpRequest<B>{
    params?: any;
    header?: any;
    body?:B;
}

export enum HttpStatusCode{
    Ok = 200,
    BadRequest = 400,
    CREATED = 201,
    SERVER_ERROR = 500,
}

export interface IController{
    handle(HttpRequest:HttpRequest<unknown>):Promise<HttpResponse<unknown>>
}