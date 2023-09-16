import React,{useState} from "react"
import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
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
        ButtonSpinner
    } from '@gluestack-ui/themed';
import Image from "next/image";
import Logo from "../../public/logo.png";
import { doLogin } from "@/utils/api";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

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

    // const errorToast = useToast()
    const router = useRouter()

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

                if(!user){
                    throw new Error("Usuário não encontrado")
                }

                if(!user.is_active){
                    throw new Error("Usuário inativo")
                }

                router.push('/home')
            } catch (err) {
                if ( err instanceof AxiosError || err instanceof Error) {
                    window.alert(err.message)
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
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="colunm">
                <FormControl mt="130px" isRequired>
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
                            <Input>
                                <InputInput 
                                    type="text" 
                                    placeholder="Username" 
                                    color="grey" 
                                    onChangeText={(text) => setUserName(text)}
                                />
                            </Input>
                            <FormControl.Error>
                                Username é obrigatório
                            </FormControl.Error>
                        </VStack>
                        <VStack space="md" mb="10px">
                            <Input>
                                <InputInput 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Senha" color="grey" 
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <InputIcon pr="$3" onPress={handleState}>
                            
                                <Icon
                                    as={showPassword ? EyeIcon : EyeOffIcon}
                                    color="$darkBlue500"
                                />
                                </InputIcon>
                            </Input>
                            <FormControl.Error>
                                Senha é obrigatório
                            </FormControl.Error>
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