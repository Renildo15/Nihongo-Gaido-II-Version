import React, {useState, useContext, useEffect, ChangeEvent} from "react";
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
    ModalFooter,
    CloseIcon,
    FormControl,
    FormControlLabelText,
    Input,
    InputInput,
    HStack,
    Box, 
    Text
} from "@gluestack-ui/themed";

import { useProfile } from "@/utils/api";
import {AuthContext} from "@/context/AuthContext";
import InputMask from 'react-input-mask';


interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalProfile({ isOpen, onClose }: ModalProfileProps) {

    

    const {userInfo} = useContext(AuthContext)

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
    const [dataNascimento, setDataNascimento] = useState(originalProfile?.date_of_birth || "")

    const [telefoneValido, setTelefoneValido] = useState(true)

    
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


    const isValidPhone = (phone: string) => {
        const regex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
        return regex.test(phone);
    }

    const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        setTelefone(value);
    
        if (!isValidPhone(value)) {
            setTelefoneValido(false);
        } else {
            setTelefoneValido(true);
        }
    }
    

    if(originalProfileError) {
        return (
            <Box justifyContent="center" alignItems="center" w={"100%"} >
                <Text color="#D02C23">Erro ao carregar perfil</Text>
            </Box>
        )
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
                    <FormControl>
                        <HStack justifyContent="space-between">
                            <VStack space="md">
                                <FormControlLabelText color="#D02C23">Nome:</FormControlLabelText>
                                <Input>
                                    <InputInput
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </Input>
                                <FormControlLabelText color="#D02C23">Sobrenome:</FormControlLabelText>
                                <Input>
                                    <InputInput 
                                        value={sobrenome}
                                        onChange={(e) => setSobrenome(e.target.value)}
                                    />
                                </Input>
                                <FormControlLabelText color="#D02C23">Username:</FormControlLabelText>
                                <Input>
                                    <InputInput 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Input>
                            
                            </VStack>
                            <VStack space="md">
                                <FormControlLabelText color="#D02C23">Email:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </Input>
                                    <FormControlLabelText color="#D02C23">Telefone:</FormControlLabelText>
                                    <Input>
                                        <InputMask
                                            mask="(99) 9 9999-9999"
                                            value={telefone}
                                            onChange={handleTelefoneChange}
                                            
                                        >
                                            {(inputProps) => <InputInput {...inputProps} />}
                                        </InputMask>                                     
                                    </Input>
                                    {!telefoneValido && <div style={{color: 'red'}}>Número de telefone inválido.</div>}
                                    <FormControlLabelText color="#D02C23">Data de Nascimento:</FormControlLabelText>
                                    <Input>
                                        <InputInput 
                                            value={dataNascimento}
                                            onChange={(e) => setDataNascimento(e.target.value)}
                                        />
                                    </Input>
                            </VStack>
                        </HStack>
                    </FormControl>
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
                        onPress={onClose}
                        bg="#D02C23"
                        sx={{
                            ":hover": {
                              bg: "$red700",
                            },
                            ":active": {
                              bg: "$red800",
                            },
                        }}
                        isDisabled={!someInfoChanged}
                    >
                        <ButtonText>Salvar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}