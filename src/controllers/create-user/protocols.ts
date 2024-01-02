import { User } from "../../models/users";


export interface CreateUserParams{
    firtsName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface ICreateUserRepository{
    createUser(params: CreateUserParams):Promise<User>
}