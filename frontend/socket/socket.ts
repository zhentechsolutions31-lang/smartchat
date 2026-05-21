
import { API_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";




let socket: Socket | null = null;
export async function ConnectSocket(): Promise<Socket> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        throw new Error("No token found in local storage");
    }

    if (!socket) {
        socket = io(API_URL, {
            auth: { token }
        });


        // wait for connection to be established
        await new Promise((resolve, reject) => {
            const onConnect = () => {
                console.log("Socket connected", socket?.id);
                cleanup();
                resolve(true);
            };

            const onConnectError = (err: any) => {
                console.error("Socket connection error:", err);
                cleanup();
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
                reject(err);
            };

            const cleanup = () => {
                socket?.off("connect", onConnect);
                socket?.off("connect_error", onConnectError);
            };

            socket?.on("connect", onConnect);
            socket?.on("connect_error", onConnectError);
        });

    }
    return socket;
}


export function getSocket(): Socket | null {

    return socket;
}



export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}