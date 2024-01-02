import { IController } from "../protocols";
import { IGetUserRepository } from "./protocols";

export class GetUserController implements IController{

    constructor(private readonly GetUsersRepository:IGetUserRepository){}

    async handle()  {
        try {
            const users = await this.GetUsersRepository.getUsers()
            return{
                statusCode:200,
                body:users
            } 
        } catch (error) {
            return{
                statusCode:500,
                body:"Something went wrong."
            }
        }
    }

}