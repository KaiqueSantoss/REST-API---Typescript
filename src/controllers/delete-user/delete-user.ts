import { HttpRequest, HttpResponse, IController } from "../protocols";
import { User } from "../../models/users";
import {IDeleteUserRepository } from "./protocols";


export class DeleteUserController implements IController {
    constructor(private readonly DeleteUserRepository:IDeleteUserRepository){}
   async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest?.params?.id
            
            if(!id){
                return{
                    statusCode:400,
                    body:"Missing user id"
                }
            }

            const user = await this.DeleteUserRepository.deleteUser(id)

            return{
                statusCode:200,
                body:user
            }

        } catch (error) {
            return{
                statusCode:500,
                body:"Something went wrong."
            }
        }
    }

}