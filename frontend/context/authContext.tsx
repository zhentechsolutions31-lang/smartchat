import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authServices";
import { ConnectSocket, disconnectSocket } from "@/socket/socket";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => { },
  signOut: async () => { },
  signUp: async () => { },
  updateToken: async () => { },
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  const router = useRouter();

  // Update Token
  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);

      await AsyncStorage.setItem("token", token);

      const decoded = jwtDecode<DecodedTokenProps>(token) as {
        user: UserProps;
      };

      setUser(decoded.user);
    }
  };

  useEffect(() => {
    loadtoken();
  }, []);
  const loadtoken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken)
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          await AsyncStorage.removeItem("token");
          return;
        }

        
        setToken(storedToken);
        await ConnectSocket();
        setUser(decoded.user);  
        gotoHomepage();

      } catch (error) {

        goWelcomePage();
      }
    }
    else {

      goWelcomePage();
    }
  };


  const gotoHomepage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");

    }, 1500);
  };

  const goWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  }






  // Sign In
  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);

    await updateToken(response.token);
    await ConnectSocket();

    router.replace("/(main)/home");
  };

  // Sign Up
  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string | null
  ) => {
    const response = await register(
      name,
      email,
      password,
      avatar
    );

    await updateToken(response.token);
    await ConnectSocket();

    router.replace("/(main)/home");
  };

  // Sign Out
  const signOut = async () => {
    setToken(null);

    setUser(null);

    await AsyncStorage.removeItem("token");
    disconnectSocket();

    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signUp,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);