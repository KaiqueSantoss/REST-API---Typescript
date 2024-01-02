import { HttpRequest, HttpResponse } from "../models/protocols";
import { User } from "../models/users";
import { IUpdateUserController, UpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IUpdateUserController{
    constructor( private readonly UpdateUserRepository: IUpdateUserRepository){}
   async update(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {


    try {
        
        const id = httpRequest?.params?.id;
        const body = httpRequest?.body;

        if(!id){
            return{
                statusCode:400,
                body:'Missing user id'
            }
        }

        const allowFieldsToUpdate:(keyof UpdateUserParams)[] = [ 'firstName' , 'lastName', 'password']

        const someFieldIsNotAllowedToUpdate = Object.keys(body).some(key=> !allowFieldsToUpdate
            .includes( key as keyof UpdateUserParams))

            if(someFieldIsNotAllowedToUpdate){
                return{
                    statusCode:400,
                    body:'Some received field is not allowed '
                }
            }


            const user = await this.UpdateUserRepository.updateUser(id,body);

            return{
                statusCode:200,
                body:user
            }

    } catch (error) {
        return{
            statusCode:400,
            body:"Somithing went wrog."
        }
    }


    }

}