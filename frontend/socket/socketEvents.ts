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

export const updateUserProfile = async (
  name: string,
  avatar: string | null,
  token?: string
): Promise<{ success: boolean; token: string; msg: string }> => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) {
      reject(new Error("No socket connection available"));
      return;
    }

    socket.emit("updateProfile", { name, avatar });

    const handleSuccess = (data: any) => {
      socket.off("updateProfileSuccess", handleSuccess);
      socket.off("updateProfileFail", handleFail);
      resolve(data);
    };

    const handleFail = (data: any) => {
      socket.off("updateProfileSuccess", handleSuccess);
      socket.off("updateProfileFail", handleFail);
      reject(new Error(data.message || "Failed to update profile"));
    };

    socket.on("updateProfileSuccess", handleSuccess);
    socket.on("updateProfileFail", handleFail);
  });
};