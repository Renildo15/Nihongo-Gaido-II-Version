import React from "react";
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
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputInput,
    HStack,
} from "@gluestack-ui/themed";


interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
    ref?: any;
}

export default function ModalProfile({ isOpen, onClose, ref }: ModalProfileProps) {
    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent maxWidth="550px">
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
                                    <InputInput />
                                </Input>
                                <FormControlLabelText color="#D02C23">Sobrenome:</FormControlLabelText>
                                <Input>
                                    <InputInput />
                                </Input>
                                <FormControlLabelText color="#D02C23">Username:</FormControlLabelText>
                                <Input>
                                    <InputInput />
                                </Input>
                            
                            </VStack>
                            <VStack space="md">
                                <FormControlLabelText color="#D02C23">Email:</FormControlLabelText>
                                    <Input>
                                        <InputInput />
                                    </Input>
                                    <FormControlLabelText color="#D02C23">Telefone:</FormControlLabelText>
                                    <Input>
                                        <InputInput />
                                    </Input>
                                    <FormControlLabelText color="#D02C23">Data de Nascimento:</FormControlLabelText>
                                    <Input>
                                        <InputInput />
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
                        onPress={onClose}
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
                    >
                        <ButtonText>Salvar</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}