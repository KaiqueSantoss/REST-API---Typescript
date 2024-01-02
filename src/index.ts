import express from "express";
import { config } from "dotenv";
import { MongoGetUserRepositery } from "./repositeries/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositeries/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepositoty } from "./repositeries/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MonogoDeleteUserRepository } from "./repositeries/delete-user/mongo-delete-users";

const main = async ()=>{
    
    config()
    const app = express()

    app.use(express.json())

    await MongoClient.connect()
    
    app.get('/users', async (req,res)=>{
        
        const mongoRepositery = new MongoGetUserRepositery()
        const getUsers = new GetUserController(mongoRepositery)
        
        const { body , statusCode } = await getUsers.handle()
        
        res.status(statusCode).send(body)
        
    })
    
    app.post('/users', async (req,res)=>{

        const mongoCreateUserRepository = new MongoCreateUserRepository()


        const createUserController = new CreateUserController(mongoCreateUserRepository)
    
        const { body , statusCode } = await     createUserController.handle({body:req.body})

        res.status(statusCode).send(body)
    })

    app.patch('/users/:id', async( req,res )=>{

        const mongoUpdateUserRepositoty = new MongoUpdateUserRepositoty()

        const updateUserController = new UpdateUserController(mongoUpdateUserRepositoty)

        const { body, statusCode } = await updateUserController.update({body: req.body, params:req.params})

        res.status(statusCode).send(body)
    })

    app.delete('/users/:id', async (req,res)=>{

        const mongoDeleteUserRepository = new MonogoDeleteUserRepository()
        
        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository) 

        const { body , statusCode} = await deleteUserController.handle({params: req.params})
        res.status(statusCode).send(body)

    })

    const PORT = process.env.PORT || 7000

    app.listen(PORT,()=>{
        console.log(`Server is running in ${PORT}`)
    })
}

main()