import React, {useState, useRef} from "react"
import { Modal, FormControl, Input, Button, useToast, Box, Column, TextArea } from "native-base"
import { createSentence, useSentences } from "../../../utils/api/sentence"

interface IModalAddSentenceProps {
    isOpen: boolean
    onClose: () => void
    grammarId: number | null
}

export default function ModalAddSentence(props: IModalAddSentenceProps) {

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [sentence, setSentence] = useState('')
    const [translate, setTranslate] = useState('')
    const [annotation, setAnnotation] = useState('')

    const [isSentenceValid, setIsSentenceValid] = useState(false)
    const [isTranslateValid, setIsTranslateValid] = useState(false)

    const [SentenceErrorMessage, setSentenceErrorMessage] = useState('')
    
    const [saving, setSaving] = useState(false)

    const handleSentence = (text: string) => {
        setSentence(text)

        const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

        if (text.trim().length === 0) {
            setIsSentenceValid(false)
            setSentenceErrorMessage('Sentence is required')
        } else if (!japaneseRegex.test(text)) {
            setIsSentenceValid(false)
            setSentenceErrorMessage('Sentence must be in Japanese')
        } else {
            setIsSentenceValid(true)
            setSentenceErrorMessage('')
        }
    }

    const handleTranslate = (text: string) => {
        setTranslate(text)
        if(text.trim().length === 0 || text.length <= 3) {
            setIsTranslateValid(false)
        } else {
            setIsTranslateValid(true)
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} initialFocusRef={initialRef} finalFocusRef={finalRef} >
            <Modal.Content 
                maxWidth="400px"
                _light={{
                    bg: '#F2F2F2'
                }}
                _dark={{
                    bg: '#333333'
                }}
            >
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Add new sentence</Modal.Header>
                <Modal.Body>
                    <Column>
                        <FormControl isInvalid={!isSentenceValid} isRequired>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Sentence</FormControl.Label>
                            <Input
                                _light={{
                                    bg: 'white'
                                }}
                                _dark={{
                                    bg: '#262626'
                                }}
                                onChangeText={handleSentence}
                                value={sentence}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Sentence"
                            />
                            <FormControl.ErrorMessage>
                                {SentenceErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isTranslateValid}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Translate</FormControl.Label>
                            <Input
                                onChangeText={handleTranslate}
                                value={translate}
                                _light={{
                                    bg: 'white'
                                }}
                                _dark={{
                                    bg: '#262626'
                                }}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Structure"
                            />
                            <FormControl.ErrorMessage>
                                Translate is required
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Annotation</FormControl.Label>
                            <TextArea
                                _light={{
                                    bg: 'white'
                                }}
                                _dark={{
                                    bg: '#262626'
                                }}  
                                autoCompleteType={'off'}
                                onChangeText={text => setAnnotation(text)}
                                value={annotation}
                                h={100}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Explain"
                            />
                        </FormControl>

                    </Column>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button 
                            variant="ghost" 
                            colorScheme="blueGray" 
                            onPress={()=> {
                                props.onClose()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                            isDisabled={ !isSentenceValid || !isTranslateValid }
                            isLoading={saving}
                            // onPress={save}
                        >
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}