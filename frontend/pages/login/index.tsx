import React,{ useState } from "react"
import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import Head from "next/head"
import { Button, 
        Box, 
        VStack, 
        Center,
        FormControl, 
        Input,
        InputInput,
        InputIcon,
        Icon,
        ButtonText,
        EyeIcon,
        EyeOffIcon,
        ButtonSpinner,
        useToast,
        Toast,
        ToastTitle,
        ToastDescription,
        Pressable
    } from '@gluestack-ui/themed';
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { doLogin } from "@/utils/api/user";

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
        
        if(userName && password){
            setSendingLogin(true)
            try{
                const user = await doLogin(userName, password)

                router.push('/home')
                toast.show({
                    placement: "top",
                    render: ({ id }) => {
                        return (
                            <Toast id={id} action="attention" variant="solid" bg="$green600">
                            <VStack space="xs">
                                <ToastTitle color="$white">Login efetuado com sucesso</ToastTitle>
                                <ToastDescription color="$white">
                                Seja bem vindo {user?.first_name}
                                </ToastDescription>
                            </VStack>
                            </Toast>
                        )
                    }
                })
            } catch (err) {
                if ( err instanceof AxiosError || err instanceof Error) {
                    toast.show({
                        placement: "top",
                        render: ({ id }) => {
                          return (
                            <Toast id={id} action="attention" variant="solid" bg="$red600">
                              <VStack space="xs">
                                <ToastTitle color="$white">Usuário não encontrado</ToastTitle>
                                <ToastDescription color="$white">
                                  Verifique seu usuário e senha e tente novamente
                                </ToastDescription>
                              </VStack>
                            </Toast>
                          )
                        },
                      })
                } else {
                  console.error(err)
                }
              } finally {
                setSendingLogin(false)
            }
        }
    }
    
    return (
       <Center>
            <Head>
                <title>
                    Nihongo Gaido - Login
                </title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" >
                <FormControl 
                    mt="130px" 
                    isRequired>
                    <VStack space="md" justifyContent="center" alignItems="center" mb="20px">
                        <Image
                            src={Logo}
                            alt="Logo Teze"
                            width={150}
                            height={150}
                            priority
                        />
                    </VStack>
                    <VStack space="md" width="400px">
                        <VStack space="md" mb="10px">
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput 
                                    type="text" 
                                    placeholder="Username" 
                                    color="$gray700" 
                                    onChangeText={(text) => setUserName(text)}
                                />
                            </Input>
                            <FormControl.Error>
                                Username é obrigatório
                            </FormControl.Error>
                        </VStack>
                        <VStack space="md" mb="10px">
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Senha" 
                                    color="$gray700" 
                                    onChangeText={(text) => setPassword(text)}
                                    
                                />
                                <InputIcon 
                                    pr="$3" onPress={handleState}
                                    borderColor="none"
                                    sx={{
                                        ":focus": {
                                            borderColor: "$red600",
                                        }
                                    }}
                                >
                            
                                <Icon
                                    as={showPassword ? EyeIcon : EyeOffIcon}
                                    color="$red500"
                                />
                                </InputIcon>
                            </Input>
                            <FormControl.Error>
                                Senha é obrigatório
                            </FormControl.Error>
                        </VStack>
                        <VStack space="md" mb="10px">
                            <Pressable onPress={() => router.push('/register')}>
                                <ButtonText color="$red600">Não tem conta? Registre-se</ButtonText>
                            </Pressable>
                        </VStack>
                        <Button
                            onPress={login}
                            ml="auto"
                            bg="$red600"
                            sx={{
                                ":hover": {
                                  bg: "$red700",
                                },
                                ":active": {
                                  bg: "$red800",
                                },
                              }}
                        >
                            {sendingLogin ? (
                                <ButtonSpinner />
                            ): (
                                <ButtonText color="$white">Entrar</ButtonText>
                            )}
                        </Button>
                    </VStack>
                </FormControl>
            </Box>
       </Center>
    )
}