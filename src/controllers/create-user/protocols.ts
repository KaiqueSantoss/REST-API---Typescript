import { User } from "../models/users";

export interface ICreateUserParams{
    firtsName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface ICreateUserRepository{
    createUser(params: ICreateUserParams):Promise<User>
}