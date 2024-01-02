import { HttpResponse,HttpRequest } from "../models/protocols";
import { User } from "../models/users";

export interface ICreateUsersController{
    handle(httpRequest: HttpRequest<CreateUserParams>):Promise<HttpResponse<User>>

}

export interface CreateUserParams{
    firtsName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface ICreateUserRepository{
    createUser(params: CreateUserParams):Promise<User>
}