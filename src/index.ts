import express from "express";
import { config } from "dotenv";
import { MongoGetUserRepositery } from "./repositeries/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";

const main = async ()=>{
    
    config()
    const app = express()

    await MongoClient.connect()
    
    app.get('/users', async (req,res)=>{
        
        const mongoRepositery = new MongoGetUserRepositery()
        const getUsers = new GetUserController(mongoRepositery)
        
        const { body , statusCode } = await getUsers.handle()
        
        res.send(body).status(statusCode)
        
    })
    

    const PORT = process.env.PORT || 7000
    
    app.listen(PORT,()=>{
        console.log(`Server is running in ${PORT}`)
    })
}

main()