import React,{createContext, useEffect} from "react";  
import { IUser, doLogin } from "@/utils/api/user";
import Cookies from "js-cookie"
interface IAuthContext {
    authenticateUser: (email: string, password: string) => Promise<void>;
    setUserInfo: (userData: IUser | null) => void;
    userInfo: IUser | null;
}

export const AuthContext = createContext<IAuthContext>({
    authenticateUser: async () => {},
    setUserInfo: () => {},
    userInfo: null
});

interface IAuthProviderProps {
    children: React.ReactNode;
    userInfoState: [
        IUser | null,
        React.Dispatch<React.SetStateAction<IUser | null>>
    ]
  }

  export function AuthProvider({ children, userInfoState }: IAuthProviderProps) {
    const [userInfo, setUserInfo] = userInfoState;
    useEffect(() =>{
        const userInfoFromCookies = Cookies.get('userInfo')
        if(userInfoFromCookies){
            setUserInfo(JSON.parse(userInfoFromCookies))
        }
    },[])
    const authenticateUser = async (email: string, password: string) => {
        try {
            const data = await doLogin(email, password);
            if(data){
                setUserInfo(data);
                Cookies.set('userInfo', JSON.stringify(data))
            } else{
                setUserInfo(null);
                Cookies.remove('userInfo')
            }
           
        } catch (error) {
            throw new Error("Email ou senha incorreto. Tente novamente.");
        }
    }

    return(
        <AuthContext.Provider value={{ authenticateUser, setUserInfo, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
  }