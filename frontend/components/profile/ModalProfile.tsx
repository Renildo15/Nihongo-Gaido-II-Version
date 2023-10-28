import React, {useState, useEffect, ChangeEvent} from "react";
import { 
    Modal, 
    ModalBackdrop, 
    ModalContent, 
    ModalHeader, 
    Heading,
    ModalCloseButton,
    Icon,
    ModalBody,
    VStack,
    Button,
    ButtonText,
    ButtonSpinner,
    ModalFooter,
    CloseIcon,
    FormControl,
    FormControlLabelText,
    FormControlError,
    FormControlErrorText,
    FormControlErrorIcon,
    AlertCircleIcon,
    Input,
    InputInput,
    HStack,
    Box, 
    Text,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription
} from "@gluestack-ui/themed";

import { useProfile, updateProfile, WhoIam } from "@/utils/api/user";
import { nameIsValid, usernameIsValid, emailIsValid, dateBirthIsValid, removePhoneFormatting } from "@/utils/validations";
import InputMask from 'react-input-mask';
import DatePicker,{ registerLocale }  from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR);
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'



interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalProfile({ isOpen, onClose }: ModalProfileProps) {

    const {
        data: userInfo,
        error: userError
    } = WhoIam()

    const {
        data: originalProfile,
        error: originalProfileError,
        mutate: originalProfileMutate,
    } = useProfile(userInfo?.id)


    const [nome, setNome] = useState(originalProfile?.user.first_name || "")
    const [sobrenome, setSobrenome] = useState(originalProfile?.user.last_name || "")
    const [username, setUsername] = useState(originalProfile?.user.username || "")
    const [email, setEmail] = useState(originalProfile?.user.email || "")
    const [telefone, setTelefone] = useState(originalProfile?.phone || "")
    const [dataNascimento, setDataNascimento] = useState("")

    const [isNomeValido, setIsNomeValido] = useState(true)
    const [isSobrenomeValido, setIsSobrenomeValido] = useState(true)
    const [isUsernameValido, setIsUsernameValido] = useState(true)
    const [isEmailValido, setIsEmailValido] = useState(true)
    const [isTelefoneValido, setIsTelefoneValido] = useState(true)
    const [isDataNascimentoValido, setIsDataNascimentoValido] = useState(true)
    const [saving, setSaving] = useState(false)

    const [mensagemErro, setMensagemErro] = useState("")

    const toast = useToast()

    const someInfoChanged = (
        nome !== originalProfile?.user.first_name ||
        sobrenome !== originalProfile?.user.last_name ||
        username !== originalProfile?.user.username ||
        email !== originalProfile?.user.email ||
        telefone !== originalProfile?.phone ||
        dataNascimento !== originalProfile?.date_of_birth
    )

    function setOriginalValues(){
        if(originalProfile){
            setNome(originalProfile?.user.first_name)
            setSobrenome(originalProfile?.user.last_name)
            setUsername(originalProfile?.user.username)
            setEmail(originalProfile?.user.email)
            setTelefone(originalProfile?.phone)
            setDataNascimento(originalProfile?.date_of_birth)
        }
    }

    const handleNameChange = (name: string) => {
        setNome(name);
        setIsNomeValido(nameIsValid(name));
    }

    const handleLastNameChange = (lastname: string) => {
        setSobrenome(lastname);
        setIsSobrenomeValido(nameIsValid(lastname));
    }

    const handleUsernameChange = (username: string) => {
        setUsername(username);
        setIsUsernameValido(usernameIsValid(username));
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
        setIsEmailValido(emailIsValid(email));
    }

    const handlePhoneChange = (newPhone: string) => {
        const value = newPhone.replace(/\D/g, '')
    
        let formattedPhone = ''
        let isInvalid = false
        if (value.length <= 10) {
          formattedPhone = `(${value.slice(0, 2)}) ${value.slice(2)}`
          isInvalid = true
        } else if (value.length <= 11) {
          formattedPhone = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
          isInvalid = false
        } else {
          formattedPhone = telefone
          isInvalid = true
        }
        setTelefone(formattedPhone)
        setIsTelefoneValido(isInvalid)
        validatePhone(formattedPhone)
    }

    const validatePhone = (phone: string) => {
        if (phone.length >= 15) {
            setIsTelefoneValido(true)
        } else {
            setIsTelefoneValido(false)
        }
    }
    

    if(originalProfileError) {
        return (
            <Box justifyContent="center" alignItems="center" w={"100%"} >
                <Text color="#D02C23">Erro ao carregar perfil</Text>
            </Box>
        )
    }

    async function save () {
        setSaving(true)
        
        try {
            const telefoneSemFormatacao = removePhoneFormatting(telefone)
            const dataNascimentoFormatada = format(new Date(dataNascimento), 'yyyy-MM-dd')
            
            const profileUpdated = await updateProfile(
                userInfo?.id,
                {
                    id: originalProfile?.id,
                    first_name: nome,
                    last_name: sobrenome,
                    username: username,
                    email: email,
                    phone: telefoneSemFormatacao,
                    date_of_birth: dataNascimentoFormatada
                }
            )
           
            if (profileUpdated){
                toast.show({
                    placement: "top",
                    render: ({ id }) => {
                        return (
                            <Toast id={id} action="attention" variant="solid" bg="$green600">
                                <VStack space="xs">
                                    <ToastTitle color="$white">Perfil alterado com sucesso!</ToastTitle>
                                </VStack>
                            </Toast>
                        )
                    }
                })

                originalProfileMutate()
                setSaving(false)
                onClose()
            }

            setSaving(false)
            onClose()
        } catch (error) {
            console.log(error)
            toast.show({
                placement: "top",
                render: ({ id }) => {
                  return (
                    <Toast id={id} action="attention" variant="solid" bg="$red600">
                      <VStack space="xs">
                        <ToastTitle color="$white">Problema ao salvar perfil</ToastTitle>
                      </VStack>
                    </Toast>
                  )
                },
            })
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalBackdrop />
            <ModalContent maxWidth={550}>
                <ModalHeader>
                    <Heading color="#D02C23" size="lg">Editar perfil</Heading>
                    <ModalCloseButton>
                       <Icon as={CloseIcon} size="sm" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack>
                        <HStack justifyContent="space-between">
                            <VStack space="md">
                               <FormControl isInvalid={!isNomeValido}>
                                    <FormControlLabelText color="#D02C23">Nome:</FormControlLabelText>
                                    <Input>
                                        <InputInput
                                            value={nome}
                                            onChangeText={handleNameChange}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                            Informe um nome válido.
                                        </FormControlErrorText>
                                    </FormControlError>
                               </FormControl>
                                <FormControl isInvalid={!isSobrenomeValido}>
                                    <FormControlLabelText color="#D02C23">Sobrenome:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={sobrenome}
                                            onChangeText={handleLastNameChange}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                            Informe um sobrenome válido.
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <FormControl isInvalid={!isUsernameValido}>
                                    <FormControlLabelText color="#D02C23">Username:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={username}
                                            onChangeText={handleUsernameChange}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                            Informe um username válido.
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                            </VStack>
                            <VStack space="md">
                                <FormControl isInvalid={!isEmailValido}>
                                    <FormControlLabelText color="#D02C23">Email:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={email}
                                            onChangeText={handleEmailChange}
                                        />
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                            Informe um email válido.
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <FormControl isInvalid={!isTelefoneValido}>
                                    <FormControlLabelText color="#D02C23">Telefone:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={telefone}
                                            onChangeText={handlePhoneChange}
                                            mask="+55 (99) 99999-9999"
                                        />                                    
                                    </Input>
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                           Número de telefone inválido.
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                                <FormControl isInvalid={!isDataNascimentoValido}>
                                    <FormControlLabelText color="#D02C23">Data de Nascimento:</FormControlLabelText>
                                    <DatePicker    
                                        locale="ptBR" 
                                        selected={dataNascimento} 
                                        onChange={(date) => setDataNascimento(date)} 
                                        
                                    /> 
                                    <FormControlError>
                                        <FormControlErrorIcon as={AlertCircleIcon} color="#D02C23" />
                                        <FormControlErrorText>
                                            Informe uma data válida.
                                        </FormControlErrorText>
                                    </FormControlError>
                                </FormControl>
                            </VStack>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() =>{
                            setOriginalValues()
                            onClose()
                        }}
                        isDisabled={!someInfoChanged}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="positive"
                        borderWidth="$0"
                        onPress={save}
                        bg="#D02C23"
                        sx={{
                            ":hover": {
                              bg: "$red700",
                            },
                            ":active": {
                              bg: "$red800",
                            },
                        }}
                        isDisabled={
                            !someInfoChanged || 
                            !isNomeValido || 
                            !isSobrenomeValido || 
                            !isUsernameValido || 
                            !isEmailValido || 
                            !isTelefoneValido || 
                            !isDataNascimentoValido
                        }
                    >
                        <ButtonText>Salvar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}