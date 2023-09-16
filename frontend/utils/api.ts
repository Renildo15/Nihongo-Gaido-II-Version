import axios from "axios";
import useSWR from "swr";

const fetcchSimple = (url: string) => axios.get(url).then((res) => res.data);

interface IUser{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_active: boolean;
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