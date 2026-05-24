import dotenv  from "dotenv";
import { Server as SocketIOServer,Socket } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import Jwt  from "jsonwebtoken";
import { registerUserEvents } from "./userEvents";


dotenv.config()

export function initializeSocket(server: any):SocketIOServer  {
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
    // auth middle ware 
io.use((socket:Socket,next)=>{
    const token = socket.handshake.auth.token;
    if(!token){
        return next(new Error("Authentication error: No token provided"));

    }


    Jwt.verify(token, process.env.JWT_SECRET as string, (err:any, decoded:any)=>{
        if(err){
            return next(new Error("Authentication error: Invalid token"));
        }

        //attached user data to socker 
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
    })
})  


// when socket connects register h the venet 


io.on("connection", async (socket: Socket) => {
    console.log("a user connected: ", socket.id);    
    const userId = socket.data.userId;
    console.log("user connected: ", userId,"user name: ", socket.data.name);

    // register evenet 

    registerUserEvents(io, socket);  

        socket.on("disconnect", () => {
            // users logout
        console.log(`user disconnected: , ${userId}`);
    });

});
 

return io;
}        
