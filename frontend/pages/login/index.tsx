import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { AxiosError } from "axios";
import { doLogin } from "../../utils/api/user";
import Logo from "../../public/images/logo.png"
import { 
    useToast,
    Center,
    Column,
    Row,
    FormControl,
    Input,
    Text
} from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    const cookies = new Cookies(req, res)

    if(cookies.get('auth-token')) {
        return {
            redirect: {
                destination: '/home',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default function Login() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [sendingLogin, setSendingLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter()
    const toast = useToast()
    
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    return (
        <Center borderWidth={1} h={'100vh'}>
            <Head>
                <title>
                    Nihongo Gaido - Login
                </title>
            </Head>
            <Column borderWidth={1}>
                <Column justifyContent={'center'} alignItems={'center'}>
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={150}
                        height={150}
                        priority
                    />
                    <Text fontFamily={'Inter-Bold'} fontSize={'18px'} fontWeight={'600'} color={'#D02C23'}>
                        Nihongo Gaido
                    </Text>
                </Column>
                <Column>
                    <FormControl>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                        />
                    </FormControl>
                </Column>
            </Column>
        </Center>
    )
}