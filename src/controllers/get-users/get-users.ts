import { ok, serverError } from "../helpers";
import { IController } from "../protocols";
import { IGetUserRepository } from "./protocols";
import { User } from "../../models/users";
export class GetUserController implements IController{

    constructor(private readonly GetUsersRepository:IGetUserRepository){}

    async handle()  {
        try {
            const users = await this.GetUsersRepository.getUsers()
            return ok<User[]>(users)
        } catch (error) {
            return serverError()
        }
    }

}