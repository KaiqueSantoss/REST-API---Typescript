import { User } from "../../models/users"


export interface IGetUserRepository{
    getUsers():Promise<User[]>
}