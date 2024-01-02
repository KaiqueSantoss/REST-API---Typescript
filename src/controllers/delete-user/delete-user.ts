import { HttpRequest, HttpResponse, IController } from "../protocols";
import { User } from "../../models/users";
import {IDeleteUserRepository } from "./protocols";
import { badsRequests, serverError } from "../helpers";
import { ok } from "../helpers";

export class DeleteUserController implements IController {
    constructor(private readonly DeleteUserRepository:IDeleteUserRepository){}
   async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
        try {
            const id = httpRequest?.params?.id
            
            if(!id){
                return badsRequests("Missing user id")
            }

            const user = await this.DeleteUserRepository.deleteUser(id)

            return ok<User>(user)

        } catch (error) {
            return serverError()
        }
    }

}