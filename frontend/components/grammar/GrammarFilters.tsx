import React from "react";
import { Input, Select, Row, Button, Column } from "native-base";
import { MdAdd, MdSearch } from "react-icons/md";

export default function GrammarFilters() {
    return (
        <Column px={5} space={'10px'}>
            <Row justifyContent={'space-between'}>
                <Input 
                    placeholder="Search grammar" 
                    w={'50%'}
                    size={'md'} 
                    bg={'white'}
                    InputRightElement={<MdSearch size={30} color="#D02C23" />}
                />
                <Select
                    size={'md'}
                    bg={'white'}
                    selectedValue="all"
                    minWidth={200}
                    accessibilityLabel="Select grammar"
                    placeholder="Select grammar"
                    _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <MdAdd size={5} />,
                    }}
                    mt={1}
                    w={'200px'}
                >
                    <Select.Item label="Level" value="level" />
                    <Select.Item label="Noun" value="noun" />
                    <Select.Item label="Verb" value="verb" />
                    <Select.Item label="Adjective" value="adjective" />
                    <Select.Item label="Adverb" value="adverb" />
                    <Select.Item label="Preposition" value="preposition" />
                    <Select.Item label="Conjunction" value="conjunction" />
                    <Select.Item label="Interjection" value="interjection" />
                </Select>
            </Row>
            <Row justifyContent={'space-between'}>
                <Select
                    size={'md'}
                    bg={'white'}
                    selectedValue="all"
                    minWidth={200}
                    accessibilityLabel="Select grammar"
                    placeholder="Select grammar"
                    _selectedItem={{
                        bg: "cyan.600",
                        endIcon: <MdAdd size={5} />,
                    }}
                    mt={1}
                    w={'200px'}
                >
                    <Select.Item label="Date" value="date" />
                    <Select.Item label="Noun" value="noun" />
                    <Select.Item label="Verb" value="verb" />
                    <Select.Item label="Adjective" value="adjective" />
                    <Select.Item label="Adverb" value="adverb" />
                    <Select.Item label="Preposition" value="preposition" />
                    <Select.Item label="Conjunction" value="conjunction" />
                    <Select.Item label="Interjection" value="interjection" />
                </Select>

                <Button
                    
                    size={'md'}
                    variant={'solid'}
                    bg={'#D02C23'} 
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    ml={5}
                    leftIcon={<MdAdd size={20} color="white" />}
                >
                    Add grammar
                </Button>
            </Row>
        </Column>
    )
}