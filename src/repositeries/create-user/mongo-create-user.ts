import { ICreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { User } from "../../controllers/models/users";
import { MongoClient } from "../../database/mongo";

export class MongoCreateUser implements ICreateUserRepository{
   async createUser(params: ICreateUserParams): Promise<User> {

   const { insertedId}  = await MongoClient.db.collection('users').insertOne(params)
   
   const user = await MongoClient.db.collection<Omit<User, "id">>("users").findOne({_id: insertedId})
   if(!user){
    throw new Error("User not created!")
   }


   const { _id, ...rest } = user

   return {id:_id.toHexString(),...rest}
}

}