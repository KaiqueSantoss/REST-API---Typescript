import { HttpRequest, HttpResponse } from "../models/protocols";
import { User } from "../models/users";

export interface IDeleteUserController{
    handle(httpRequest:HttpRequest<any>):Promise<HttpResponse<User>>
}

export interface IDeleteUserRepository{
    deleteUser(id:string):Promise<User>
}