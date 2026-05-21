import { API_URL } from "@/constants";
import axios from "axios";


export const login = async (email: string, password: string):Promise <{token:String}> => {
    try {
        const response = await axios.post(`${API_URL}/api/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        const msg = error?.response?.data?.msg || "An error occurred during login";
                
        throw new Error(msg);
    }
};  


export const register = async (name: string, email: string, password: string, avatar?: string|null ):Promise <{token:String}> => {
    try {
        const response = await axios.post(`${API_URL}/api/register`, {
            name,
            email,
            password,
            avatar,
        });
        return response.data;
    } catch (error) {
        console.error("Register error:", error);
        const msg = error?.response?.data?.msg || "An error occurred during registration";
                
        throw new Error(msg);
    }
};  


