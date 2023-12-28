import React, { useState, useRef } from "react"
import { Input, Column, FormControl, Toast, Text, Button, Row } from "native-base"
import TextEditor from "../TextEditor"

export default function Translate() {
    
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [translate, setTranslate] = useState<string>('')
    const [annotation, setAnnotation] = useState<string>('')

    const [isTitleValid, setIsTitleValid] = useState<boolean>(false)
    const [isTextValid, setIsTextValid] = useState<boolean>(false)
    const [isTranslateValid, setIsTranslateValid] = useState<boolean>(false)

    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('')
    const [textErrorMessage, setTextErrorMessage] = useState<string>('')
    const [translateErrorMessage, setTranslateErrorMessage] = useState<string>('')


    const [AddAnnotation, setAddAnnotation] = useState<boolean>(false)

    const annotationRef = useRef(null)
    const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

    const handleTitle = (text: string) => {
        setTitle(text)
        
        if (text.trim().length === 0) {
            setIsTitleValid(false)
            setTitleErrorMessage('Title is required')
        } else if (!japaneseRegex.test(text)) {
            setIsTitleValid(false)
            setTitleErrorMessage('Title must be in Japanese')
        } else {
            setIsTitleValid(true)
            setTitleErrorMessage('')
        }
    }

    const handleText = (text: string) => {
        setText(text)
        
        if (text.trim().length === 0) {
            setIsTextValid(false)
            setTextErrorMessage('Text is required')
        } else if (!japaneseRegex.test(text)) {
            setIsTextValid(false)
            setTextErrorMessage('Text must be in Japanese')
        } else {
            setIsTextValid(true)
            setTextErrorMessage('')
        }
    }
    console.log(translate.length)
    const handleTranslate = (text: string) => {
        setTranslate(text)
        
        if (text.trim().length === 0 ) {
            setIsTranslateValid(false)
            setTranslateErrorMessage('Translate is required')
        } else if (text.length <= 16) {
            setIsTranslateValid(false)
            setTranslateErrorMessage('Translate must be at least 10 characters')
        } else {
            setIsTranslateValid(true)
            setTranslateErrorMessage('')
        }
    }

    const handleAnnotation = (text: string) => {
        setAnnotation(text)
    }
   
    return (
        <Column
            space={4}
            borderWidth={1}
            w={'70%'}
            p={'10px'}
            rounded={'md'}
            _dark={{
                borderColor: 'white',
                bg: 'gray.700',
            }}
            _light={{
                borderColor: 'gray.700',
                bg: 'gray.100',
            }}
        >
            <Column
                space={4}
            >
                <FormControl isInvalid={!isTitleValid}>
                    <FormControl.Label
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                        key="title-label"
                        testID="title-label"
                    >
                        Title
                    </FormControl.Label>
                    <Input
                        placeholder={'Title'}
                        shadow={1}
                        _focus={{borderColor: '#D02C23'}}
                        _hover={{borderColor: '#D02C23'}}
                        focusOutlineColor={'#D02C23'}
                        _light={{
                            bg: 'white'
                        }}
                        _dark={{
                            bg: '#262626'
                        }}
                        onChangeText={handleTitle}
                        value={title}
                        fontSize={'lg'}
                        testID="title-input"
                    />

                    <FormControl.ErrorMessage
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                        key="title-error-message"
                        testID="title-error-message"
                    >
                        {titleErrorMessage}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isTextValid}>
                    <FormControl.Label
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                    >
                        Text
                    </FormControl.Label>
                    <TextEditor content={text} onContentChanged={handleText}/>

                    <FormControl.ErrorMessage
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                    >
                        {textErrorMessage}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isTranslateValid}>
                    <FormControl.Label
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                    >
                        Translate
                    </FormControl.Label>
                    <TextEditor content={translate} onContentChanged={handleTranslate}/>

                    <FormControl.ErrorMessage
                        _text={{
                            fontWeight: 'bold',
                            fontSize: 'lg'
                        }}
                    >
                        {translateErrorMessage}
                    </FormControl.ErrorMessage>
                </FormControl>
                {AddAnnotation && (
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontWeight: 'bold',
                                fontSize: 'lg'
                            }}
                        >
                            Annotation
                        </FormControl.Label>
                        <TextEditor content={annotation} onContentChanged={handleAnnotation} ref={annotationRef}/>
                        
                    </FormControl>
                
                )}
            </Column>
            <Row
                space={4}
                justifyContent={'space-between'}
            >
                <Button
                    w={'40%'}
                    bg={'#D02C23'}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    isDisabled={!isTitleValid || !isTextValid || !isTranslateValid}
                >
                    Save
                </Button>
                <Button 
                    onPress={() => {
                        setAddAnnotation(!AddAnnotation)
                        if (!AddAnnotation && annotationRef.current) {
                            // @ts-ignore
                            annotationRef.current.focus();
                        }
                    }}
                    w={'40%'}
                    bg={'#D02C23'}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                >
                    {AddAnnotation ? 'Hide Annotation' : 'Add Annotation'}
                </Button>
            </Row>
        </Column>
    )
}