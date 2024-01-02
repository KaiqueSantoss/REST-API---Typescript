
export interface HttpResponse<T>{
    statusCode:number;
    body: T;
}

export interface HttpRequest<B>{
    params?: any;
    header?: any;
    body?:B;
}

export interface IController{
    handle(HttpRequest:HttpRequest<unknown>):Promise<HttpResponse<unknown>>
}