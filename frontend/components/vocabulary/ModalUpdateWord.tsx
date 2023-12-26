import React, { useRef, useState, useEffect } from "react";
import { Modal, FormControl, Input, Button, useToast, Box, Column, Select } from "native-base";
import { updateWord, useWords, useWord } from "../../utils/api/vocabulary";
import { levelOptions, typeWordsOptions } from "../../utils/options";
import { ICategoryList, useCategories } from "../../utils/api/category";
import { TypeLevel, TypeWord } from "../../utils/api/types";

interface IModalAddWordProps {
    isOpen: boolean
    onClose: () => void
    wordId: number | null
}

export default function ModalUpdateWord(props: IModalAddWordProps) {

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {
        mutate: wordsRevalidate
    } = useWords()

    const{data: originalWord} = useWord(props.wordId || 0)

    const {
        data: categories,
        mutate: categoriesRevalidate
    } = useCategories()
    

    const [word, setWord] = useState('')
    const [reading, setReading] = useState('')
    const [meaning, setMeaning] = useState('')
    const [type, setType] = useState('')
    const [level, setLevel] = useState('')
    const [category, setCategory] = useState<ICategoryList | undefined>()

    const [isWordValid, setIsWordValid] = useState(false)
    const [isReadingValid, setIsReadingValid] = useState(false)
    const [isMeaningValid, setIsMeaningValid] = useState(false)
    const [isTypeValid, setIsTypeValid] = useState(false)
    const [isLevelValid, setIsLevelValid] = useState(false)
    const [isCategoryValid, setIsCategoryValid] = useState(false)

    const [saving, setSaving] = useState(false)

    const [wordErrorMessage, setWordErrorMessage] = useState('')
    const [readingErrorMessage, setReadingErrorMessage] = useState('')
    const [meaningErrorMessage, setMeaningErrorMessage] = useState('')

    const toast = useToast()

    const someInfoChanged  = (
        word !== originalWord?.word ||
        reading !== originalWord?.reading ||
        meaning !== originalWord?.meaning ||
        type !== originalWord?.type ||
        level !== originalWord?.level ||
        category?.id !== originalWord?.category?.id
    )

    useEffect(() => {
        if(originalWord) {
            setWord(originalWord.word)
            setReading(originalWord.reading)
            setMeaning(originalWord.meaning)
            setType(originalWord.type)
            setLevel(originalWord.level)
            setCategory(originalWord.category)
        }
    }, [originalWord])

    console.log(isWordValid)
    console.log(isReadingValid)
    console.log(isMeaningValid)
    console.log(isTypeValid)
    console.log(isLevelValid)
    console.log(isCategoryValid)

    function setOriginalValues() {
        if(originalWord) {
            setWord(originalWord.word)
            setReading(originalWord.reading)
            setMeaning(originalWord.meaning)
            setType(originalWord.type)
            setLevel(originalWord.level)
            setCategory(originalWord.category)
        }
    }

    const handleWordChange = (text: string) => {
        setWord(text)
        const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

        if (text.trim().length === 0) {
            setIsWordValid(false)
            setWordErrorMessage('Word is required')
        } else if (!japaneseRegex.test(text)) {
            setIsWordValid(false)
            setWordErrorMessage('Word must be in Japanese')
        } else {
            setIsWordValid(true)
            setWordErrorMessage('')
        }
    }

    const handleReading = (text: string) => {
        setReading(text)
        const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

        if (text.trim().length === 0) {
            setIsReadingValid(false)
            setReadingErrorMessage('Reading is required')
        } else if (!japaneseRegex.test(text)) {
            setIsReadingValid(false)
            setReadingErrorMessage('Reading must be in Japanese')
        } else {
            setIsReadingValid(true)
            setReadingErrorMessage('')
        }
    }

    const handleMeaning = (text: string) => {
        setMeaning(text)
        if (text.trim().length === 0) {
            setIsMeaningValid(false)
            setMeaningErrorMessage('Meaning is required')
        } else {
            setIsMeaningValid(true)
            setMeaningErrorMessage('')
        }
    }

    const handleSelectType = (text: string) => {
        setType(text)
        if (text.trim().length === 0) {
            setIsTypeValid(false);
        } else {
            setIsTypeValid(true);
        }
    }

    const handleSelectLevel = (text: string) => {
        setLevel(text)
        if (text.trim().length === 0) {
            setIsLevelValid(false);
        } else {
            setIsLevelValid(true);
        }
    }

    const handleSelectCategory = (text: string) => {
        setCategory(categories?.find(category => category.name === text))
        if (text.trim().length === 0) {
            setIsCategoryValid(false);
        } else {
            setIsCategoryValid(true);
        }
    }

    async function save() {
        setSaving(true)
        try {
                const updatedWord = await updateWord(
                props.wordId || 0,
                {
                    word: word,
                    reading: reading,
                    meaning: meaning,
                    type: type as TypeWord,
                    level: level as TypeLevel,
                    category: category?.id || 0 // Provide a default value of 0
                }
            )

            if (updatedWord) {
                toast.show({
                    title: 'Success',
                    description: 'Word updated successfully',
                    placement: 'top',
                    duration: 2000
                })

                wordsRevalidate()
                categoriesRevalidate()
                props.onClose()
                clearInputs()
            }
        } catch (error) {
            alert(error)
        } finally {
            setSaving(false)
        }
    }

    function clearInputs() {
        setWord('')
        setReading('')
        setMeaning('')
        setType('')
        setLevel('')
        setCategory(undefined)
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
            <Modal.Header _text={{color:'#D02C23'}}>Add new word</Modal.Header>
            <Modal.Body>
                <Column>
                    <FormControl isInvalid={!isWordValid} isRequired>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Word</FormControl.Label>
                        <Input
                            _light={{
                                bg: 'white'
                            }}
                            _dark={{
                                bg: '#262626'
                            }}
                            onChangeText={handleWordChange}
                            value={word}
                            shadow={1}
                            _focus={{borderColor: '#D02C23'}}
                            _hover={{borderColor: '#D02C23'}}
                            focusOutlineColor={'#D02C23'}
                            placeholder="Word"
                        />
                        <FormControl.ErrorMessage>
                            {wordErrorMessage}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!isReadingValid}>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Reading</FormControl.Label>
                        <Input
                            onChangeText={handleReading}
                            value={reading}
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
                            placeholder="Reading"
                        />
                        <FormControl.ErrorMessage>
                            {readingErrorMessage}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!isMeaningValid}>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Meaning</FormControl.Label>
                        <Input
                            onChangeText={handleMeaning}
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
                    <FormControl isRequired isInvalid={!isLevelValid}>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Level</FormControl.Label>
                        <Select
                            selectedValue={level}
                            _light={{
                                bg: 'white'
                            }}
                            _dark={{
                                bg: '#262626'
                            }}
                            minWidth={200}
                            accessibilityLabel="Select level"
                            placeholder="Select level"
                            onValueChange={handleSelectLevel}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <Box size={4} />,
                            }}
                        > 
                            <Select.Item label="level" value="" />
                            {levelOptions.map((level, index)=> (
                                <Select.Item key={index} label={level.label} value={level.value} />
                            ))}
                        </Select>
                        <FormControl.ErrorMessage>
                            Level is required
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!isTypeValid}>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Type word</FormControl.Label>
                        <Select
                            selectedValue={type}
                            _light={{
                                bg: 'white'
                            }}
                            _dark={{
                                bg: '#262626'
                            }}
                            minWidth={200}
                            accessibilityLabel="Select type word"
                            placeholder="Select type word"
                            onValueChange={handleSelectType}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <Box size={4} />,
                            }}
                        > 
                            <Select.Item label="type word" value="" />
                            {typeWordsOptions.map((type, index)=> (
                                <Select.Item key={index} label={type.label} value={type.value} />
                            ))}
                        </Select>
                        <FormControl.ErrorMessage>
                            Type word is required
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!isCategoryValid}>
                        <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Category</FormControl.Label>
                        <Select
                            selectedValue={category?.name}
                            _light={{
                                bg: 'white'
                            }}
                            _dark={{
                                bg: '#262626'
                            }}
                            minWidth={200}
                            accessibilityLabel="Select category"
                            placeholder="Select category"
                            onValueChange={handleSelectCategory}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <Box size={4} />,
                            }}
                        > 
                            <Select.Item label="category" value="" />
                            {categories?.map((category, index)=> (
                                <Select.Item key={index} label={category.name} value={category.name} />
                            )) || []}
                        </Select>
                        <FormControl.ErrorMessage>
                            Category is required
                        </FormControl.ErrorMessage>
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
                            setOriginalValues()
                            clearInputs()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        bg={'#D02C23'}
                        _hover={{bg: '#ae251e'}}
                        _pressed={{bg: '#ae251e'}}
                        isDisabled={ 
                            !isWordValid || 
                            !isReadingValid || 
                            !isMeaningValid || 
                            !isLevelValid || 
                            !isTypeValid || 
                            !isCategoryValid || 
                            !isLevelValid ||
                            !someInfoChanged
                        }
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