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
    Text,
    Button,
    Pressable
} from "native-base";
import { MdRemoveRedEye } from 'react-icons/md'
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

    const login = async () => {
        setSendingLogin(true)
        if (userName && password) {
            try {
                const user = await doLogin(userName, password)

                if(!user) throw new Error('Please, verify your credentials')

                router.push('/home')
                toast.show({
                    title: 'Welcome',
                    description: `Welcome ${user.first_name}`,
                    placement: 'top',
                    duration: 2000
                })
            } catch (error) {
                if ( error instanceof AxiosError || error instanceof Error) {
                    toast.show({
                        title: 'Error',
                        description: error.message,
                        placement: 'top',
                        duration: 2000
                    })
                } else {
                    toast.show({
                        title: 'Error',
                        description: 'Something went wrong',
                        placement: 'top',
                        duration: 2000
                    })
                }
            } finally {
                setSendingLogin(false)
            }
        }
    }

    return (
        <Center borderWidth={1} h={'100vh'} bg={'#f2f2f2'}>
            <Head>
                <title>
                    Nihongo Gaido - Login
                </title>
            </Head>
            <Column 
                borderRadius={'5px'} 
                shadow={3} 
                p={6} 
                borderWidth={1} 
                w={'60%'} 
                justifyContent={'center'} 
                alignItems={'center'} 
                borderColor={'#D02C23'}
                bg={'#fff'}
            >
                <Column justifyContent={'center'} alignItems={'center'}>
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={150}
                        height={150}
                        priority
                    />
                    <Text fontSize={'18px'} fontWeight={'600'} color={'#D02C23'}>
                        Nihongo Gaido
                    </Text>
                </Column>
                <Column width={'40%'} space={'8px'}>
                    <FormControl>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>
                            Username
                        </FormControl.Label>
                        <Input
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            placeholder="Username"
                            shadow={1}
                            _focus={{borderColor: '#D02C23'}}
                            _hover={{borderColor: '#D02C23'}}
                            focusOutlineColor={'#D02C23'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Password</FormControl.Label>
                        <Input
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            shadow={1}
                            _focus={{borderColor: '#D02C23'}}
                            _hover={{borderColor: '#D02C23'}}
                            focusOutlineColor={'#D02C23'}
                            InputRightElement={
                                <Pressable onPress={handleState} >
                                    <MdRemoveRedEye size={20}  color="#D02C23"/>
                                </Pressable>
                            }
                        />
                    </FormControl>
                </Column>
                <Column space={'8px'} width={'40%'} mt={'8px'}>
                    <Column width={'100%'}>
                        <Row>
                            <Text mr={'6px'}>
                                Don t have an account? 
                            </Text>
                            <Pressable onPress={() => router.push('/register')}>
                                <Text fontWeight={'600'} color={'#D02C23'} onPress={() => router.push('/register')}>
                                    Register
                                </Text>
                            </Pressable>
                        </Row>
                    </Column >
                    <Column width={'100%'}>
                        <Row>
                            <Text mr={'6px'}>
                                Forgot your password? 
                            </Text>
                            <Text fontWeight={'600'} color={'#D02C23'} onPress={() => router.push('/forgot-password')}>
                                Reset
                            </Text>
                        </Row>
                    </Column>
                </Column>
                <Column w={'40%'} justifyContent={'flex-end'} alignItems={'flex-end'}> 
                    <Button 
                        w={'90px'} 
                        bg={'#D02C23'} 
                        _hover={{bg: '#ae251e'}}
                        onPress={login}
                        isLoading={sendingLogin}
                    >
                        Login
                    </Button>
                </Column>
            </Column>
        </Center>
    )
}