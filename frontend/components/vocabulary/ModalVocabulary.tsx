import React, { useState } from "react"
import { Modal, Button, Box, Column } from "native-base"

interface ModalSentenceProps {
    isOpen: boolean
    onClose: () => void
    wordId: number | null
}

export default function ModalVocabulary(props: ModalSentenceProps) {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Word options</Modal.Header>
                <Modal.Body>
                    <Box>
                        <Column space={'10px'}>
                            <Button 
                                colorScheme="danger" 
                                onPress={() => {
                                    setModalDeleteVisible(true)
                                    props.onClose()
                                }}>
                                Delete
                            </Button>
                            <Button 
                                colorScheme="warning" 
                                onPress={() => {
                                    setModalVisible(true)
                                    props.onClose()
                                }}
                            >
                                Edit
                            </Button>
                        </Column>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button 
                            onPress={props.onClose}
                            variant="ghost" 
                            colorScheme="blueGray" 
                        >
                            Cancel
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
        
    )
}