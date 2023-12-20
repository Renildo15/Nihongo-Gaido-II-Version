import React, { useRef, useState, useEffect } from "react";
import { Modal, FormControl, Input, Button, useToast, Box, Column, TextArea } from "native-base";
import { useSentence, useSentences, updateSentence } from "../../../utils/api/sentence";

interface IModalUpdateSentenceProps {
    isOpen: boolean;
    onClose: () => void;
    sentenceId: number | null;
    grammarId: number | null;
}

export default function ModalUpdateSentence(props: IModalUpdateSentenceProps) {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {mutate: sentencesRevalidate} = useSentences(props.grammarId || 0);
    const {data: originalSentence} = useSentence(props.sentenceId || 0);

    const [sentence, setSentence] = useState('')
    const [translate, setTranslate] = useState('')
    const [annotation, setAnnotation] = useState('')

    const [isSentenceValid, setIsSentenceValid] = useState(false)
    const [isTranslateValid, setIsTranslateValid] = useState(false)

    const [SentenceErrorMessage, setSentenceErrorMessage] = useState('')
    
    const [saving, setSaving] = useState(false)

    const toast = useToast()

    const someInfoChanged  = (
        sentence !== originalSentence?.sentence ||
        translate !== originalSentence?.translate ||
        annotation !== originalSentence?.annotation
    )

    useEffect(() => {
        if(originalSentence) {
            setSentence(originalSentence.sentence)
            setTranslate(originalSentence.translate)
            setAnnotation(originalSentence.annotation)
        }
    }, [originalSentence])

    function setOriginalValues() {
        if(originalSentence) {
            setSentence(originalSentence.sentence)
            setTranslate(originalSentence.translate)
            setAnnotation(originalSentence.annotation)
        }
    }

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

    const clearInputs = () => {
        setSentence('')
        setTranslate('')
        setAnnotation('')
    }

    async function save() {
        setSaving(true)
        try {
            const sentenceUpdated = await updateSentence(
                props.sentenceId || 0,
                {
                    sentence: sentence,
                    translate: translate,
                    annotation: annotation
                }
            )

            if(sentenceUpdated) {
                toast.show({
                    title: 'Sentence updated',
                    description: 'Your sentence was updated successfully',
                    placement: 'top',
                    duration: 2000
                })
                clearInputs()
                props.onClose()
                sentencesRevalidate()
            } else {
                toast.show({
                    title: 'Error',
                    description: 'Something went wrong',
                    placement: 'top',
                    duration: 2000
                })
            }
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
                <Modal.Header _text={{color:'#D02C23'}}>Update sentence</Modal.Header>
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
                                placeholder="Translate"
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
                                props.onClose()
                                clearInputs()
                                setOriginalValues()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                            isDisabled={ !isSentenceValid || !isTranslateValid || !someInfoChanged}
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