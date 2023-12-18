import React, { useState } from "react"
import { Modal, Button, useToast, Box, Column } from "native-base"

interface ModalSentenceProps {
    isOpen: boolean
    onClose: () => void
    sentenceId: number | null
}

export default function ModalSentence(props: ModalSentenceProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Sentences options</Modal.Header>
                <Modal.Body>
                    <Box>
                        <Column space={'10px'}>
                            <Button colorScheme="danger" onPress={() => {}}>
                                Delete
                            </Button>
                            <Button colorScheme="warning" onPress={() => {}}>
                                Edit
                            </Button>
                            <Button colorScheme="info" onPress={() => {}}>
                                View
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