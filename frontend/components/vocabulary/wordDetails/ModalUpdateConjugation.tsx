import React, { useEffect, useRef, useState } from "react";
import { Modal, FormControl, Input, Button, useToast, Column, TextArea } from "native-base";
import { useConjugations, updateConjugation } from "../../../utils/api/conjugation";

interface IModalUpdateConjugationProps {
    isOpen: boolean
    wordId: number
    conjugationId: number
    onClose: () => void
}

export default function ModalUpdateConjugation(props: IModalUpdateConjugationProps) {

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {
        data: originalConjugation,
        mutate: conjugationRevalidate
    } = useConjugations(props.wordId)

    const [present, setPresent] = useState('')
    const [past, setPast] = useState('')
    const [negative, setNegative] = useState('')
    const [teForm, setTeForm] = useState('')
    const [potential, setPotential] = useState('')
    const [passive, setPassive] = useState('')
    const [causative, setCausative] = useState('')
    const [imperative, setImperative] = useState('')
    const [volitional, setVolitional] = useState('')
    const [conditional, setConditional] = useState('')
    const [causativePassive, setCausativePassive] = useState('')

    const [isInvalidPresent, setIsInvalidPresent] = useState(false)
    const [isInvalidPast, setIsInvalidPast] = useState(false)
    const [isInvalidNegative, setIsInvalidNegative] = useState(false)
    const [isInvalidTeForm, setIsInvalidTeForm] = useState(false)
    const [isInvalidPotential, setIsInvalidPotential] = useState(false)
    const [isInvalidPassive, setIsInvalidPassive] = useState(false)
    const [isInvalidCausative, setIsInvalidCausative] = useState(false)
    const [isInvalidImperative, setIsInvalidImperative] = useState(false)
    const [isInvalidVolitional, setIsInvalidVolitional] = useState(false)
    const [isInvalidConditional, setIsInvalidConditional] = useState(false)
    const [isInvalidCausativePassive, setIsInvalidCausativePassive] = useState(false)

    const [presentErrorMessage, setPresentErrorMessage] = useState('')
    const [pastErrorMessage, setPastErrorMessage] = useState('')
    const [negativeErrorMessage, setNegativeErrorMessage] = useState('')
    const [teFormErrorMessage, setTeFormErrorMessage] = useState('')
    const [potentialErrorMessage, setPotentialErrorMessage] = useState('')
    const [passiveErrorMessage, setPassiveErrorMessage] = useState('')
    const [causativeErrorMessage, setCausativeErrorMessage] = useState('')
    const [imperativeErrorMessage, setImperativeErrorMessage] = useState('')
    const [volitionalErrorMessage, setVolitionalErrorMessage] = useState('')
    const [conditionalErrorMessage, setConditionalErrorMessage] = useState('')
    const [causativePassiveErrorMessage, setCausativePassiveErrorMessage] = useState('')


    const [saving, setSaving] = useState(false)

    const toast = useToast()

    useEffect(() => {
        if (originalConjugation) {
            setPresent(originalConjugation.present)
            setPast(originalConjugation.past)
            setNegative(originalConjugation.negative)
            setTeForm(originalConjugation.te_form)
            setPotential(originalConjugation.potential)
            setPassive(originalConjugation.passive)
            setCausative(originalConjugation.causative)
            setImperative(originalConjugation.imperative)
            setVolitional(originalConjugation.volitional)
            setConditional(originalConjugation.conditional)
            setCausativePassive(originalConjugation.causative_passive)
        }
    }, [originalConjugation])

    function setOriginalValues() {
        if (originalConjugation) {
            setPresent(originalConjugation.present)
            setPast(originalConjugation.past)
            setNegative(originalConjugation.negative)
            setTeForm(originalConjugation.te_form)
            setPotential(originalConjugation.potential)
            setPassive(originalConjugation.passive)
            setCausative(originalConjugation.causative)
            setImperative(originalConjugation.imperative)
            setVolitional(originalConjugation.volitional)
            setConditional(originalConjugation.conditional)
            setCausativePassive(originalConjugation.causative_passive)
        }
    }

    const someInfoChanged = (
        present !== originalConjugation?.present ||
        past !== originalConjugation?.past ||
        negative !== originalConjugation?.negative ||
        teForm !== originalConjugation?.te_form ||
        potential !== originalConjugation?.potential ||
        passive !== originalConjugation?.passive ||
        causative !== originalConjugation?.causative ||
        imperative !== originalConjugation?.imperative ||
        volitional !== originalConjugation?.volitional ||
        conditional !== originalConjugation?.conditional ||
        causativePassive !== originalConjugation?.causative_passive
    )

    const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

    const handlePresentChange = (text: string) => {
        setPresent(text)
        if (text.trim().length === 0) {
            setIsInvalidPresent(true);
            setPresentErrorMessage('Present is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidPresent(true)
            setPresentErrorMessage('Present must be in Japanese')
        } else {
            setIsInvalidPresent(false);
            setPresentErrorMessage('')
        }

    }

    const handlePastChange = (text: string) => {
        setPast(text)
        if (text.trim().length === 0) {
            setIsInvalidPast(true);
            setPastErrorMessage('Past is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidPast(true)
            setPastErrorMessage('Past must be in Japanese')
        } else {
            setIsInvalidPast(false);
            setPastErrorMessage('')
        }
    }

    const handleNegativeChange = (text: string) => {
        setNegative(text)
        if (text.trim().length === 0) {
            setIsInvalidNegative(true);
            setNegativeErrorMessage('Negative is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidNegative(true)
            setNegativeErrorMessage('Negative must be in Japanese')
        } else {
            setIsInvalidNegative(false);
            setNegativeErrorMessage('')
        }
    }

    const handleTeFormChange = (text: string) => {
        setTeForm(text)
        if (text.trim().length === 0) {
            setIsInvalidTeForm(true);
            setTeFormErrorMessage('Te form is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidTeForm(true)
            setTeFormErrorMessage('Te form must be in Japanese')
        } else {
            setIsInvalidTeForm(false);
            setTeFormErrorMessage('')
        }
    }

    const handlePotentialChange = (text: string) => {
        setPotential(text)
        if (text.trim().length === 0) {
            setIsInvalidPotential(true);
            setPotentialErrorMessage('Potential is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidPotential(true)
            setPotentialErrorMessage('Potential must be in Japanese')
        } else {
            setIsInvalidPotential(false);
            setPotentialErrorMessage('')
        }
    }

    const handlePassiveChange = (text: string) => {
        setPassive(text)
        if (text.trim().length === 0) {
            setIsInvalidPassive(true);
            setPassiveErrorMessage('Passive is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidPassive(true)
            setPassiveErrorMessage('Passive must be in Japanese')
        } else {
            setIsInvalidPassive(false);
            setPassiveErrorMessage('')
        }
    }

    const handleCausativeChange = (text: string) => {
        setCausative(text)
        if (text.trim().length === 0) {
            setIsInvalidCausative(true);
            setCausativeErrorMessage('Causative is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidCausative(true)
            setCausativeErrorMessage('Causative must be in Japanese')
        } else {
            setIsInvalidCausative(false);
            setCausativeErrorMessage('')
        }
    }

    const handleImperativeChange = (text: string) => {
        setImperative(text)
        if (text.trim().length === 0) {
            setIsInvalidImperative(true);
            setImperativeErrorMessage('Imperative is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidImperative(true)
            setImperativeErrorMessage('Imperative must be in Japanese')
        } else {
            setIsInvalidImperative(false);
            setImperativeErrorMessage('')
        }
    }

    const handleVolitionalChange = (text: string) => {
        setVolitional(text)
        if (text.trim().length === 0) {
            setIsInvalidVolitional(true);
            setVolitionalErrorMessage('Volitional is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidVolitional(true)
            setVolitionalErrorMessage('Volitional must be in Japanese')
        } else {
            setIsInvalidVolitional(false);
            setVolitionalErrorMessage('')
        }
    }

    const handleConditionalChange = (text: string) => {
        setConditional(text)
        if (text.trim().length === 0) {
            setIsInvalidConditional(true);
            setConditionalErrorMessage('Conditional is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidConditional(true)
            setConditionalErrorMessage('Conditional must be in Japanese')
        } else {
            setIsInvalidConditional(false);
            setConditionalErrorMessage('')
        }
    }

    const handleCausativePassiveChange = (text: string) => {
        setCausativePassive(text)
        if (text.trim().length === 0) {
            setIsInvalidCausativePassive(true);
            setCausativePassiveErrorMessage('Causative passive is required')
        } else if (!japaneseRegex.test(text)) {
            setIsInvalidCausativePassive(true)
            setCausativePassiveErrorMessage('Causative passive must be in Japanese')
        } else {
            setIsInvalidCausativePassive(false);
            setCausativePassiveErrorMessage('')
        }
    }



    async function save(){
        setSaving(true)
        try {
            await updateConjugation(props.conjugationId, props.wordId,{present, past, negative, te_form:teForm, potential, passive, causative, imperative, volitional, conditional, causative_passive:causativePassive})
            toast.show({
                title: 'Success',
                description: 'Conjugation updated successfully',
                placement: 'top',
                duration: 2000
            })
            conjugationRevalidate()
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
                <Modal.Header _text={{color:'#D02C23'}}>Update conjugation</Modal.Header>
                <Modal.Body>
                    <Column>
                        <FormControl isInvalid={!isInvalidPresent} isRequired>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Present</FormControl.Label>
                            <Input
                                _light={{
                                    bg: 'white'
                                }}
                                _dark={{
                                    bg: '#262626'
                                }}
                                onChangeText={handlePresentChange}
                                value={present}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Example"
                            />
                            <FormControl.ErrorMessage>
                                {presentErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isInvalidNegative}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Negative</FormControl.Label>
                            <Input
                                onChangeText={handleNegativeChange}
                                value={negative}
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
                                {negativeErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidPast}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Past</FormControl.Label>
                            <Input
                                onChangeText={handlePastChange}
                                value={past}
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
                                {pastErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidTeForm}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Te form</FormControl.Label>
                            <Input
                                onChangeText={handleTeFormChange}
                                value={teForm}
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
                                {teFormErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        
                        <FormControl isRequired isInvalid={!isInvalidPotential}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Potential</FormControl.Label>
                            <Input
                                onChangeText={handlePotentialChange}
                                value={potential}
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
                                {potentialErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidCausative}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Causative</FormControl.Label>
                            <Input
                                onChangeText={handleCausativeChange}
                                value={causative}
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
                                {causativeErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidPassive}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Passive</FormControl.Label>
                            <Input
                                onChangeText={handlePassiveChange}
                                value={passive}
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
                                {passiveErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidImperative}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Imperative</FormControl.Label>
                            <Input
                                onChangeText={handleImperativeChange}
                                value={imperative}
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
                                {imperativeErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidVolitional}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Volitional</FormControl.Label>
                            <Input
                                onChangeText={handleVolitionalChange}
                                value={volitional}
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
                                {volitionalErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidPassive}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Conditional</FormControl.Label>
                            <Input
                                onChangeText={handleConditionalChange}
                                value={conditional}
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
                                {conditionalErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isInvalidCausativePassive}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Causative passive</FormControl.Label>
                            <Input
                                onChangeText={handleCausativePassiveChange}
                                value={causativePassive}
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
                                {causativePassiveErrorMessage}
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
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                            isDisabled={ 
                                !isInvalidPresent || 
                                !isInvalidNegative || 
                                !isInvalidPast || !
                                isInvalidTeForm || 
                                !isInvalidPotential || 
                                !isInvalidPassive || 
                                !isInvalidCausative || 
                                !isInvalidImperative || 
                                !isInvalidVolitional || 
                                !isInvalidConditional || 
                                !isInvalidCausativePassive ||
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