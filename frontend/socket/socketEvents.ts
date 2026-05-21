import { getSocket } from "./socket";




export const testSocket = (payload:any,off:boolean = false) => {
    const socket = getSocket();
    if (!socket) {
        console.error("No socket connection available");
        return;
    }

    if(off){
        // tunr of lisiteig to this event 
        socket.off("testsocket",payload);  // payload is the call backe
  


    }else if(typeof payload == 'function'){
        socket.on("testsocket", payload);  // call back for this event 
   

    }else{
        socket.emit("testsocket", payload); // emit event to server
    }

}