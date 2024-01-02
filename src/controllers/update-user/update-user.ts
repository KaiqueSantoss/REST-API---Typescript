import { HttpRequest, HttpResponse, IController } from "../protocols";
import { User } from "../../models/users";
import { UpdateUserParams, IUpdateUserRepository } from "./protocols";
import { badsRequests, ok, serverError } from "../helpers";

export class UpdateUserController implements IController{
    constructor( private readonly UpdateUserRepository: IUpdateUserRepository){}
   async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {


    try {
        
        const id = httpRequest?.params?.id;
        const body = httpRequest?.body;

        if(!id){
            return badsRequests('Missing user id')
        }

        if(!body){
            return badsRequests('Missing user body')
        }

        const allowFieldsToUpdate:(keyof UpdateUserParams)[] = [ 'firstName' , 'lastName', 'password']

        const someFieldIsNotAllowedToUpdate = Object.keys(body).some(key=> !allowFieldsToUpdate
            .includes( key as keyof UpdateUserParams))

            if(someFieldIsNotAllowedToUpdate){
        
                return badsRequests('Some received field is not allowed.')
            }


            const user = await this.UpdateUserRepository.updateUser(id,body);

            return ok<User>(user)

    } catch (error) {
        return serverError()
    }


    }

}