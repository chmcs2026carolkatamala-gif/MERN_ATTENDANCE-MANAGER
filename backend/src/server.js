import express from "express";
import dotenv from "dotenv";
import attRoutes from "./routes/attRoutes.js"
import { connectDB } from "./config/db.js";
import n from "node:dns/promises";
import cors from "cors";



dotenv.config()
const app=express();
const port=process.env.PORT || 3001
n.setServers(["1.1.1.1", "8.8.8.8"])
app.use(cors(
    {
        //origin:`http://localhost:5173`
    }
))

// app.get("/",(req,res)=>{
//     res.status(200).json("Hello")
//     console.log("Hello")
// })

// app.listen(port,()=>{
//     console.log(`http://localhost:${port}`)
// })

app.use(express.json())
app.use("/attendance",attRoutes)
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`http://localhost:${port}/attendance`)
    })
})

