import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";
import { MongoClient } from "../../database/mongo";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUserRepositery implements IGetUserRepository{

   async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
    .collection<MongoUser>("users")
    .find({})
    .toArray();

    return users.map(({_id, ...rest })=>({
        ...rest,
        id: _id.toHexString(),
    }))

    }
}