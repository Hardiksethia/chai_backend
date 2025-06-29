// require('dotenv').config()
// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({path: './env'})


connectDB()
.then(
    ()=>{
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running on ${process.env.PORT}`)
        })
    }
)
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED!! ", err)
})




/* import express from "express"
const app=express()

(async () => {
    try{
     await mongoose.connect(`${procees.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error", (error)=>{
        console.log("ERR:", error);
        throw error
     })
     app.listen(procees.env.PORT,()=>{
        console.log(`process is listening on ${process.env.PORT}`);
     })
    } catch(error){
        console.error("ERROR: ", error)
        throw err
    }
})() */