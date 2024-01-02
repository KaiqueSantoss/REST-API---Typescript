import { HttpRequest, HttpResponse } from "../models/protocols";
import { User } from "../models/users";

export interface UpdateUserParams{
    firstName?: string;
    lastName?: string;
    password?:string;
}

export interface IUpdateUserController{
    update(httpRequest:HttpRequest<any>):Promise<HttpResponse<User>>


}

export interface IUpdateUserRepository{

    updateUser( id:string ,params:UpdateUserParams):Promise<User>
}