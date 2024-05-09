import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes"
import bodyParser from "body-parser";
const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use("/api", userRoutes)
const MONGo_URL = "mongodb://127.0.0.1:27017";
mongoose.connect(MONGo_URL,{
    dbName:"rrhlk"
}).then(()=>{
    console.log("database connect")
}).catch((error)=>console.log(error))

app.listen(4000,()=>{
    console.log(`server is running on https://localhost:4000`)
})
