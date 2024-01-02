import { HttpRequest, HttpResponse } from "../models/protocols";
import validator from "validator";
import { User } from "../models/users";
import { CreateUserParams, ICreateUserRepository, ICreateUsersController } from "./protocols";


export class CreateUserController implements ICreateUsersController{
    constructor(private readonly CreateUserRepository:ICreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {

            const requiredFields = ["firstName","lastName","email","password"]

            for(const field of  requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                    return{
                        statusCode:400,
                        body:`Field ${field} is required.`
                    }
                }
            }

            if(!httpRequest.body){
                return{
                    statusCode:400,
                    body:'Please specify a body'
                }
            }

            //verifcando o Email

            const emailIsValid = validator.isEmail(httpRequest.body.email)
            if(!emailIsValid){
                return{
                    statusCode:400,
                    body:"This email is invalid, please fill the field correctly."
                }
            }

            const user = await this.CreateUserRepository.createUser(httpRequest.body)
            return {
                statusCode:201,
                body:user
            }
        } catch (error) {
            return{
                statusCode:500,
                body:'Something went wrog.'
            }
        }
    }
 

}

