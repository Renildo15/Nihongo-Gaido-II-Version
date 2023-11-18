import React, { useRef, useState, useEffect } from "react";
import { Modal, FormControl, Input, Button, useToast, Box, Column, TextArea, Select } from "native-base";
import { updateGrammar, useGrammar, useGrammars } from "../../utils/api/grammar";
import { levelOptions } from "../../utils/levelOptions";

interface IModalUpdateGrammarProps {
    isOpen: boolean
    onClose: () => void
    grammarId: number | null
}

export default function ModalUpdateGrammar(props: IModalUpdateGrammarProps) {

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {
        mutate: grammarsRevalidate
    } = useGrammars()
    
    const {
        data: originalGrammar,
        error: origialGrammarError,
        isLoading: originalGrammarIsLoading,
        isValidating: originalGrammarIsValidating,
    } = useGrammar(props.grammarId ?? 1)

    const [grammar, setGrammar] = useState('')
    const [structure, setStructure] = useState('')
    const [level, setLevel] = useState('')
    const [explain, setExplain] = useState('')

    const [isGrammarValid, setIsGrammarValid] = useState(true)
    const [isStructureValid, setIsStructureValid] = useState(true)
    const [isLevelValid, setIsLevelValid] = useState(true)

    const [saving, setSaving] = useState(false)

    const [structureErrorMessage, setStructureErrorMessage] = useState('')

    const toast = useToast()

    const someInfoChanged = (
        grammar !== originalGrammar?.grammar ||
        structure !== originalGrammar?.structure ||
        level !== originalGrammar?.level ||
        explain !== originalGrammar?.explain
    )

    useEffect(() => {
        if (originalGrammar) {
            setGrammar(originalGrammar.grammar)
            setStructure(originalGrammar.structure)
            setLevel(originalGrammar.level)
            setExplain(originalGrammar.explain)
        }
    }, [originalGrammar])

    function setOriginalValues () {
        if (originalGrammar) {
            setGrammar(originalGrammar.grammar)
            setStructure(originalGrammar.structure)
            setLevel(originalGrammar.level)
            setExplain(originalGrammar.explain)
        }
    }

    const handleGrammarChange = (text: string) => {
        setGrammar(text)
        if (text.trim().length === 0 || text.length <= 3) {
            setIsGrammarValid(false);
        } else {
            setIsGrammarValid(true);
        }
    }

    const handleStructure = (text: string) => {
        setStructure(text)

        const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F]+$/;

        if (text.trim().length === 0) {
            setIsStructureValid(false)
            setStructureErrorMessage('Structure is required')
        } else if (!japaneseRegex.test(text)) {
            setIsStructureValid(false)
            setStructureErrorMessage('Structure must be in Japanese')
        } else {
            setIsStructureValid(true)
            setStructureErrorMessage('')
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

    async function save() {
        setSaving(true)
        if (props.grammarId === null) return
        try {
            const updatedGrammar = await updateGrammar(
                props.grammarId,
                {
                    grammar: grammar,
                    structure: structure,
                    level: level,
                    explain: explain
                }
            )

            if (updatedGrammar) {
                toast.show({
                    title: 'Success',
                    description: `Grammar updated`,
                    placement: 'top',
                    duration: 2000
                })
            }
            grammarsRevalidate()
            props.onClose()
        } catch (error) {
            alert(error)
        } finally {
            setSaving(false)
        }
    } 
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} initialFocusRef={initialRef} finalFocusRef={finalRef} >
            <Modal.Content maxWidth="400px" bg={'#f2f2f2'}>
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Update grammar</Modal.Header>
                <Modal.Body>
                    <Column>
                        <FormControl isInvalid={!isGrammarValid} isRequired>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Grammar</FormControl.Label>
                            <Input
                                bg={'white'}
                                onChangeText={handleGrammarChange}
                                value={grammar}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Grammar"
                            />
                            <FormControl.ErrorMessage>
                                Grammar is required
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isStructureValid}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Structure</FormControl.Label>
                            <Input
                                onChangeText={handleStructure}
                                value={structure}
                                bg={'white'}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Structure"
                            />
                            <FormControl.ErrorMessage>
                                {structureErrorMessage}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!isLevelValid}>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Level</FormControl.Label>
                            <Select
                                selectedValue={level}
                                bg={'white'}
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

                        <FormControl>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Explain</FormControl.Label>
                            <TextArea
                                bg={'white'}
                                autoCompleteType={'off'}
                                onChangeText={text => setExplain(text)}
                                value={explain}
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
                            isDisabled={ !isGrammarValid || !isStructureValid || !isLevelValid || !someInfoChanged }
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