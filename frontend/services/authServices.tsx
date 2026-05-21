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

export const updateUserProfile = async (
  name: string,
  avatar: string | null,
  token: string
): Promise<{ success: boolean; token: string; msg: string }> => {
  try {
    const response = await axios.put(
      `${API_URL}/api/update-profile`,
      { name, avatar },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update profile service error:", error);
    const msg = error?.response?.data?.msg || "An error occurred during profile update";
    throw new Error(msg);
  }
};



