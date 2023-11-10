import axios from "axios";
import useSWR from "swr";

export const fetcchSimple = (url: string) => axios.get(url).then((res) => res.data);

export interface IUser{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_active: boolean;
}

export interface IUserCreate{
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export interface IProfile{
    id: number;
    user: IUser;
    phone: string;
    date_of_birth: string;
    avatar: string;
    date_created: string;
}

export interface IProfileUpdate {
    phone?: string;
    date_of_birth?: string;
    avatar?: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

export function WhoIam(){
    interface IResponse {
        user: IUser
    }

    const{
        data,
        error,
        isLoading,
        isValidating,
        mutate
    } = useSWR<IResponse>('/api/whoami/', fetcchSimple);

    return {
        data: data?.user,
        error,
        isLoading,
        isValidating,
        mutate
    
    }
}

export async function doLogin(username: string, password: string){
    interface ILoginResponse{
        user: IUser;
    }

    try{
        const response = await axios.post<ILoginResponse>('/api/auth/login/',{username, password});
        if(response.status < 200 || response.status >= 300){
            return
        }

        return response.data?.user;
    } catch(err){
        throw err;
    }
}

export async function doRegister (user: IUserCreate) {
    interface IResponse{
        message: string;
        user: IUser;
    }

    try{
        const response = await axios.post<IResponse>('/api/user', 
            {
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                password: user.password
            }
        );

        if(response.status < 200 || response.status >= 300){
            return
        }

        return response.data?.user
    } catch(err) {
        throw err;
    }
}

export function useProfile(userId: number | undefined){
    interface IResponse{
        profile: IProfile;
    }

    const {
        data, 
        error, 
        isLoading, 
        isValidating, 
        mutate
    } = useSWR<IResponse>(`/api/profile/${userId}`, fetcchSimple);

    return {
        data: data?.profile,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export async function updateProfile (userId: number, {avatar, date_of_birth, email, first_name, last_name, phone, username}: IProfileUpdate) {
    interface IUpdateResponse{
        profile: IProfile;
    }

    try{
        const response = await axios.patch<IUpdateResponse>(`/api/profile/${userId}`,{avatar, date_of_birth, email, first_name, last_name, phone, username});
        if(response.status < 200 || response.status >= 300){
            return
        }

        console.log(response.data?.profile)
        return response.data?.profile;
    } catch(err){
        console.log(err);
    }
}