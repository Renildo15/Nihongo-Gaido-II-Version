import React, { useState } from "react"
import { Modal, Button, Box, Column } from "native-base"
import ModalUpdateExample from "./ModalUpdateExample"
import ModalDeleteExample from "./ModalDeleteExample"

interface ModalExampleProps {
    isOpen: boolean
    onClose: () => void
    exampleId: number
    wordId: number
}

export default function ModalExample(props: ModalExampleProps) {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
   
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Example options</Modal.Header>
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

            <ModalUpdateExample 
                isOpen={modalVisible} 
                onClose={() => setModalVisible(false)} 
                exampleId={props.exampleId}
                wordId={props.wordId}
            />
            <ModalDeleteExample 
                isOpen={modalDeleteVisible} 
                onClose={() => setModalDeleteVisible(false)} 
                exampleId={props.exampleId}
                wordId={props.wordId}
            />
        </Modal>
        
    )
}