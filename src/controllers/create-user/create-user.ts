import { HttpRequest, HttpResponse, IController } from "../protocols";
import validator from "validator";
import { User } from "../../models/users";
import { CreateUserParams, ICreateUserRepository, } from "./protocols";
import { badsRequests, created, serverError } from "../helpers";


export class CreateUserController implements IController{
    constructor(private readonly CreateUserRepository:ICreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
        try {

            const requiredFields = ["firstName","lastName","email","password"]

            for(const field of  requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                    return badsRequests(`Field ${field} is required.`)
                }
            }

            if(!httpRequest.body){
                return badsRequests('Please specify a body')
            }

            //verifcando o Email

            const emailIsValid = validator.isEmail(httpRequest.body.email)
            if(!emailIsValid){
                return badsRequests("This email is invalid, please fill the field correctly.")

            }

            const user = await this.CreateUserRepository.createUser(httpRequest.body)
          
            return created<User>(user)
        } catch (error) {
            return serverError()
        }
    }
 

}

