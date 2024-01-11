import React, { useRef, useState, useEffect } from "react";
import { Modal, FormControl, Input, Button, useToast, Box, Column, TextArea } from "native-base";
import { updateExample, useExamples, useExample } from "../../../utils/api/example";

interface IModalAddExampleProps {
    isOpen: boolean
    wordId: number
    exampleId: number
    onClose: () => void
}

export default function ModalUpdatExample(props: IModalAddExampleProps) {

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {mutate: examplesRevalidate} = useExamples(props.wordId)
    const {data: originalExample} = useExample(props.exampleId, props.wordId)


    const [example, setExample] = useState('')
    const [meaning, setMeaning] = useState('')
    const [annotation, setAnnotation] = useState('')

    const [isExampleValid, setIsExampleValid] = useState(false)
    const [isMeaningValid, setIsMeaningValid] = useState(false)

    const [exampleErrorMessage, setExampleErrorMessage] = useState('')
    const [meaningErrorMessage, setMeaningErrorMessage] = useState('')

    const [saving, setSaving] = useState(false)

    const toast = useToast()

    const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

    const someInfoChanged = (
        example !== originalExample?.example ||
        meaning !== originalExample?.meaning ||
        annotation !== originalExample?.annotation
    )

    useEffect(() => {
        if(originalExample){
            setExample(originalExample.example)
            setMeaning(originalExample.meaning)
            setAnnotation(originalExample.annotation)
        }
    }, [originalExample])

    function setOriginalValues(){
        if(originalExample){
            setExample(originalExample.example)
            setMeaning(originalExample.meaning)
            setAnnotation(originalExample.annotation)
        }
    }

    const handleExampleChange = (text: string) => {
        setExample(text)
        if (text.trim().length === 0) {
            setIsExampleValid(false);
            setExampleErrorMessage('Example is required')
        } else if (!japaneseRegex.test(text)) {
            setIsExampleValid(false)
            setExampleErrorMessage('Example must be in Japanese')
        } else {
            setIsExampleValid(true);
            setExampleErrorMessage('')
        }

    }

    const handleMeaningChange = (text: string) => {
        setMeaning(text)
        if (text.trim().length === 0) {
            setIsMeaningValid(false);
            setMeaningErrorMessage('Meaning is required')
        } else {
            setIsMeaningValid(true);
            setMeaningErrorMessage('')
        }
    }

    async function save(){
        setSaving(true)
        try {
            await updateExample(props.exampleId, props.wordId, {example, meaning, annotation})
            toast.show({
                title: 'Success',
                description: 'Example updated successfully',
                placement: 'top',
                duration: 2000
            })
            examplesRevalidate()
            props.onClose()
        } catch (error) {
            toast.show({
                title: 'Error',
                description: 'Something went wrong',
                placement: 'top',
                duration: 2000
            })
        } finally {
            setSaving(false)
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
                <Modal.Header _text={{color:'#D02C23'}}>Edit example</Modal.Header>
                <Modal.Body>
                    <Column>
                        <FormControl isInvalid={!isExampleValid} isRequired>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Example</FormControl.Label>
                            <Input
                                _light={{
                                    bg: 'white'
                                }}
                                _dark={{
                                    bg: '#262626'
                                }}
                                onChangeText={handleExampleChange}
                                value={example}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Example"
                            />
                            <FormControl.ErrorMessage>
                                {exampleErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isMeaningValid}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Meaning</FormControl.Label>
                            <Input
                                onChangeText={handleMeaningChange}
                                value={meaning}
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
                                placeholder="Meaning"
                            />
                            <FormControl.ErrorMessage>
                                {meaningErrorMessage}
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
                                placeholder="Annotation"
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
                                setOriginalValues()
                                props.onClose()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                            isDisabled={ !isExampleValid || !isMeaningValid || !someInfoChanged }
                            isLoading={saving}
                            onPress={save}
                        >
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}