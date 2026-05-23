import { Platform } from "react-native";
// export const API_URL =   Platform.OS === "android" ? "http://192.168.0.135:3000" : "http://localhost:3000";


export const API_URL =
    Platform.OS === "ios"
        ? "http://localhost:3000"
        : "http://192.168.10.14:3000";