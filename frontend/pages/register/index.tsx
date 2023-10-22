import React, { useState } from "react";
import { 
    VStack, 
    HStack, 
    Text,
    FormControl,
    FormControlLabelText,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    AlertCircleIcon,
    Input,
    InputInput,
    InputIcon,
    ButtonGroup,
    Button,
    ButtonIcon,
    ButtonSpinner,
    ButtonText,
    Icon,
    EyeIcon,
    EyeOffIcon,
} from "@gluestack-ui/themed";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";

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

export default function Register () {
    const [showPassword, setShowPassword] = useState(false)

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
    return (
        <VStack
            maxWidth={'100vw'} 
            h={'100vh'}
            alignItems="center"
            justifyContent="center"
        >
             <Head>
                <title>
                    Nihongo Gaido - Registro
                </title>
            </Head>
            <VStack 
                borderWidth={1} 
                width={'850px'} 
                borderColor="$red600"
                px={5}
                py={10}
                borderRadius={"$md"}
                justifyContent="center" 
                alignItems="center"
            >
                <VStack width={'60%'} space={'lg'}>
                    <VStack justifyContent="center" alignItems="center">
                        <Image
                            src={Logo}
                            alt="Logo Teze"
                            width={150}
                            height={150}
                            priority
                        />
                        <Text fontFamily="Inter" color="$red600" fontSize={20} fontWeight="800">
                            Nihongo Gaido - Registro
                        </Text>
                    </VStack>
                    <VStack space={'md'}>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type="text"
                                    color="$gray700" 
                                    placeholder="Nome"
                                />
                            </Input>
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type="text"
                                    color="$gray700" 
                                    placeholder="Sobrenome"
                                />
                            </Input>
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type="text"
                                    color="$gray700" 
                                    placeholder="Username"
                                />
                            </Input>
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type="email"
                                    color="$gray700" 
                                    placeholder="Email"
                                />
                                
                            </Input>
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type={showPassword ? "text" : "password"}
                                    color="$gray700" 
                                    placeholder="Senha"
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
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                sx={{
                                    ":focus": {
                                        borderColor: "$red600",
                                    }
                                }}
                            >
                                <InputInput
                                    type={showPassword ? "text" : "password"}
                                    color="$gray700" 
                                    placeholder="Confirmar Senha"
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
                        </FormControl>
                    </VStack>
                    <ButtonGroup>
                        <Button
                            variant="solid"
                            colorScheme="red"
                            size="lg"
                            width="100%"
                            height="50px"
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
                            <ButtonText>
                                Registrar
                            </ButtonText>
                        </Button>
                    </ButtonGroup>
                </VStack>
            </VStack>
        </VStack>
    )
}