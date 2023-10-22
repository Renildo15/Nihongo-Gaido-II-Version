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
import { 
    nameIsValid, 
    usernameIsValid, 
    emailIsValid,
    getPasswordValidationErrorMessage
} from "@/utils/validations";

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

    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const [isNomeValido, setIsNomeValido] = useState(true)
    const [isSobrenomeValido, setIsSobrenomeValido] = useState(true)
    const [isUsernameValido, setIsUsernameValido] = useState(true)
    const [isEmailValido, setIsEmailValido] = useState(true)
    const [isSenhaValida, setIsSenhaValida] = useState(true)
    const [isConfirmarSenhaValida, setIsConfirmarSenhaValida] = useState(true)

    const [mensagemErroSenha, setMensagemErroSenha] = useState("")

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const handleChangeName = (text: string) => {
        setNome(text)
        setIsNomeValido(nameIsValid(text))
    }

    const handleChangeLastName = (text: string) => {
        setSobrenome(text)
        setIsSobrenomeValido(nameIsValid(text))
    }

    const handleChangeUsername = (text: string) => {
        setUsername(text)
        setIsUsernameValido(usernameIsValid(text))
    }

    const handleChangeEmail = (text: string) => {
        setEmail(text)
        setIsEmailValido(emailIsValid(text))
    }

    const handleChangeSenha = (text: string) => {
        setSenha(text)
        setIsSenhaValida(getPasswordValidationErrorMessage(text) === "")
        setMensagemErroSenha(getPasswordValidationErrorMessage(text))
    }

    const handleChangeConfirmarSenha = (text: string) => {
        setConfirmarSenha(text)
        setIsConfirmarSenhaValida(getPasswordValidationErrorMessage(text) === "")
        setMensagemErroSenha(getPasswordValidationErrorMessage(text))
        if (text !== senha) {
            setIsConfirmarSenhaValida(false)
            setMensagemErroSenha("As senhas não coincidem.")
        }
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
                        <FormControl isRequired isInvalid={!isNomeValido}>
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
                                    value={nome}
                                    onChangeText={handleChangeName}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    Informe um nome válido.
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isSobrenomeValido}>
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
                                    value={sobrenome}
                                    onChangeText={handleChangeLastName}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    Informe um sobrenome válido.
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isUsernameValido}>
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
                                    value={username}
                                    onChangeText={handleChangeUsername}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    Informe um username válido.
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isEmailValido}>
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
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={handleChangeEmail}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    Informe um email válido.
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isSenhaValida}>
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
                                    value={senha}
                                    onChangeText={handleChangeSenha}
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
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    {mensagemErroSenha}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isConfirmarSenhaValida}>
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
                                    value={confirmarSenha}
                                    onChangeText={handleChangeConfirmarSenha}
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
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                <FormControlErrorText>
                                    {mensagemErroSenha}
                                </FormControlErrorText>
                            </FormControlError>
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
                            isDisabled={
                                !isNomeValido ||
                                !isSobrenomeValido ||
                                !isUsernameValido ||
                                !isEmailValido ||
                                !isSenhaValida ||
                                !isConfirmarSenhaValida
                            }
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