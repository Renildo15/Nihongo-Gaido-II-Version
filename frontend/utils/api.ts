import axios from "axios";
import useSWR from "swr";

const fetcchSimple = (url: string) => axios.get(url).then((res) => res.data);

export interface IUser{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_active: boolean;
}

export interface IProfile{
    id: number;
    user: IUser;
    phone: string;
    date_of_birth: string;
    avatar: string;
    date_created: string;
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
        console.log(err);
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
