import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config()

const app = express()
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Server is running")
})
const PORT = process.env.PORT || 3000


const server = http.createServer(app);

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log("sever is running on the port ", PORT)

        })
    })
    .catch((error) => {
        console.log("Database not connected", error)
        process.exit(1)
    })


