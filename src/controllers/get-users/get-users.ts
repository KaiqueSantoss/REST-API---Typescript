import { IGetUserRepository, IGetUsersController } from "./protocols";

export class GetUserController implements IGetUsersController{

    constructor(private readonly GetUsersRepository:IGetUserRepository){}

    async handle()  {
        try {
            const users = await this.GetUsersRepository.getUser()
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