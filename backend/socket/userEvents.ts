import { Socket ,Server as SocketIOServer} from "socket.io";


export function registerUserEvents (io:SocketIOServer, socket:any) {
    socket.on("testSocket", (data:any) => {
        socket.emit("testSocketResponse", { message: "Hello from the server!" });
    });
}