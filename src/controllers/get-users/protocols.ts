import { HttpsResponse } from "../models/protocols"
import { User } from "../models/users"

export interface IGetUsersController{
    handle():Promise<HttpsResponse<User[]>>
}

export interface IGetUserRepository{
    getUser():Promise<User[]>
}