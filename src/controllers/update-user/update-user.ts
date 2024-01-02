import { HttpRequest, HttpResponse, IController } from "../protocols";
import { User } from "../../models/users";
import { UpdateUserParams, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IController{
    constructor( private readonly UpdateUserRepository: IUpdateUserRepository){}
   async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {


    try {
        
        const id = httpRequest?.params?.id;
        const body = httpRequest?.body;

        if(!id){
            return{
                statusCode:400,
                body:'Missing user id'
            }
        }

        if(!body){
            return{
                statusCode:400,
                body:'Missing user body'
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