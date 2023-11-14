import React, { useRef, useState, useEffect } from "react";
import { Modal, FormControl, Input, Button, useToast, Box, Text, Column, Row, TextArea, Select } from "native-base";
import { useGrammars } from "../../utils/api/grammar";
import { WhoIam } from "../../utils/api/user";
import { levelOptions } from "../../utils/levelOptions";

interface IModalAddGrammarProps {
    isOpen: boolean
    onClose: () => void
}

export default function ModalAddGrammar(props: IModalAddGrammarProps) {

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const [grammar, setGrammar] = useState('')
    const [structure, setStructure] = useState('')
    const [level, setLevel] = useState('')
    const [explain, setExplain] = useState('')
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} initialFocusRef={initialRef} finalFocusRef={finalRef} >
            <Modal.Content maxWidth="400px" bg={'#f2f2f2'}>
                <Modal.CloseButton />
                <Modal.Header _text={{color:'#D02C23'}}>Add new grammar</Modal.Header>
                <Modal.Body>
                    <Column>
                        <FormControl>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Grammar</FormControl.Label>
                            <Input
                                bg={'white'}
                                onChangeText={text => setGrammar(text)}
                                value={grammar}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Grammar"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Structure</FormControl.Label>
                            <Input
                                onChangeText={text => setStructure(text)}
                                value={structure}
                                bg={'white'}
                                shadow={1}
                                _focus={{borderColor: '#D02C23'}}
                                _hover={{borderColor: '#D02C23'}}
                                focusOutlineColor={'#D02C23'}
                                placeholder="Structure"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label _text={{color:'#D02C23', fontWeight: '600'}}>Level</FormControl.Label>
                            <Select
                                selectedValue={level}
                                bg={'white'}
                                minWidth={200}
                                accessibilityLabel="Select level"
                                placeholder="Select level"
                                onValueChange={(itemValue) => setLevel(itemValue)}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <Box size={4} />,
                                }}
                            >  
                                {levelOptions.map((level, index)=> (
                                    <Select.Item key={index} label={level.label} value={level.value} />
                                ))}
                            </Select>
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
                                props.onClose()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                        >
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}