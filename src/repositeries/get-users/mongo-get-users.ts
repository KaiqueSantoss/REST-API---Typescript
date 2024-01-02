import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "../../controllers/models/users";
import { MongoClient } from "../../database/mongo";

export class MongoGetUserRepositery implements IGetUserRepository{

   async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
    .collection<Omit<User,"id">>("users")
    .find({})
    .toArray();

    return users.map(({_id, ...rest })=>({
        ...rest,
        id: _id.toHexString(),
    }))

    }
}