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
        EyeOffIcon
    } from '@gluestack-ui/themed';
import Image from "next/image";
import Logo from "../../public/logo.png";


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

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    
    return (
       <Center>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="colunm">
                <FormControl mt="130px">
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
                                <InputInput type="text" placeholder="Username" color="grey" />
                            </Input>
                        </VStack>
                        <VStack space="md" mb="10px">
                            <Input>
                                <InputInput type={showPassword ? "text" : "password"} placeholder="Senha" color="grey" />
                                <InputIcon pr="$3" onPress={handleState}>
                            
                                <Icon
                                    as={showPassword ? EyeIcon : EyeOffIcon}
                                    color="$darkBlue500"
                                />
                                </InputIcon>
                            </Input>
                        </VStack>
                        <Button
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
                        <ButtonText 
                            color="$white"
                          
                        >
                            Login
                        </ButtonText>
                        </Button>
                    </VStack>
                </FormControl>
            </Box>
       </Center>
    )
}