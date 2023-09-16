import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'

export function redirectIfNoCredentials({ req, res}: { req: IncomingMessage, res: ServerResponse }){

    const cookies = new Cookies(req, res);
    console.log("coooooliesss",cookies.get('auth-token'))
    if(!cookies.get('auth-token')){
        return {
            redirect :{
                destination: '/login',
                permanent: false
            }
        }
    }
    return {props: {}}
}