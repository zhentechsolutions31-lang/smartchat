import { Socket, Server as SocketIOServer } from "socket.io";
import { User } from "../models/User";
import { generateToken } from "../utils/token";


export function registerUserEvents(io: SocketIOServer, socket: any) {
    socket.on("testSocket", (data: any) => {
        socket.emit("testSocketResponse", { message: "Hello from the server!" });
    });

    socket.on("updateProfile", async (data: { name?: string; avatar?: string }) => {
        console.log("updateProfile event ", data);


        const userId = socket.data.userId;
        if (!userId) {
            return socket.emit("updateProfileFail", { message: "Unauthenticated" })
        }
        try {
            const { name, avatar } = data;
            const user = await User.findById(userId);
            if (!user) {
                return socket.emit("updateProfileFail", { message: "User not found" })
            }

            if (name) {
                const existingUser = await User.findOne({ name });
                if (existingUser && existingUser._id.toString() !== userId) {
                    return socket.emit("updateProfileFail", { message: "Username is already taken" });
                }
                user.name = name;
            }

            if (avatar !== undefined) {
                user.avatar = avatar || "";
            }

            await user.save();

            // Update attached user details on socket
            socket.data.name = user.name;
            socket.data.avatar = user.avatar;

            const token = generateToken(user);
            socket.emit("updateProfileSuccess", {
                success: true,
                token,
                msg: "Profile updated successfully"
            });

        } catch (error: any) {
            console.error("Socket updateProfile error:", error);
            socket.emit("updateProfileFail", { message: error.message || "Server error" });
        }

    })

}