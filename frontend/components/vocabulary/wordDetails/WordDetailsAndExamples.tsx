import React, {useState} from "react"
import { Column, Text, Divider, Row, Pressable, Button } from "native-base"
import { useWord, IWordList } from "../../../utils/api/vocabulary"
import Error from "../../Error"
import ExampleList from "./ExampleList"
import ConjugationList from "./ConjugationList"
import { MdAdd } from "react-icons/md";
import ModalAddConjugation from "./ModalAddConjugation";
import ModalAddExample from "./ModalAddExample";

interface IWordDetailsProps {
    wordId: number
}

enum WordExampleAndConjugation{
    ExampleList,
    ConjugationList
}

export default function WordDetailsAndExamples(props: IWordDetailsProps) {

    const [selectedTab, setSelectedTab] = useState<WordExampleAndConjugation>(WordExampleAndConjugation.ExampleList)
    
    const {
        data: word,
        error: wordError,
        isLoading: wordIsLoading,
        isValidating: wordIsValidating,
    } = useWord(props.wordId)

    if(wordError !== undefined) {
        return <Error message={wordError.message}/>
    }

    if(word === undefined || wordIsLoading || wordIsValidating) {
        return <Text>Loading...</Text>
    }


    function getCurrentTab() {
        switch(selectedTab) {
            case WordExampleAndConjugation.ExampleList:
                return <ExampleList wordId={props.wordId}/>
            case WordExampleAndConjugation.ConjugationList:
                return <ConjugationList wordId={props.wordId}/>
            
            default:
                return <ExampleList wordId={props.wordId}/>
        }
    }


    return (
        <Column
            justifyContent={'center'}
            alignItems={'center'}
            space={5}
            w={'100%'}
        >
            <Header word={word}/>
            <Column
                width={'100%'}
            >
                <TabHeader setSelectedTab={setSelectedTab} word={word}/>
                {getCurrentTab()}
            </Column>

        </Column>
    )
}

interface IHeaderProps {
    word: IWordList
}

function Header({word}: IHeaderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Row
            w={'100%'}
            justifyContent={'space-between'}
        >
            <Column
                width={'50%'}
                borderWidth={1}
                _light={{bg: 'white', borderColor: 'black'}}        
                _dark={{bg: 'gray.700', borderColor: 'white'}}
                rounded={10}
                padding={5}
                
            >
                <Text
                    textAlign={'center'}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    {word.word} - {word.reading}
                </Text>
                <Divider/>  
                <Text>Meaning: {word.meaning}</Text>
                <Text>Type: {word.type}</Text>
                <Text>Level: {word.level}</Text>
                <Text>Category: {word.category?.name}</Text>
            </Column>
            <Column
                justifyContent={'space-between'}
            >
                <Button
                    bg={'#D02C23'}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                    onPress={() => setIsOpen(true)}
                >
                    Add conjugation
                </Button>

                <Button
                    bg={'#D02C23'}
                    onPress={() => setIsModalOpen(true)}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                >
                    Add example
                </Button>
            </Column>

            <ModalAddConjugation
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
                wordId={word.id}
            />

            <ModalAddExample
                isOpen={isModalOpen}
                wordId={word.id}
                onClose={() => setIsModalOpen(false)}
            />
        </Row>
    )
}

interface ITabHeaderProps {
    setSelectedTab: (tab: WordExampleAndConjugation) => void
    word: IWordList
}

function TabHeader( {setSelectedTab, word}: ITabHeaderProps){
    return (
        <Row
            justifyContent={'flex-start'}
        >
            <Pressable
                onPress={() => setSelectedTab(WordExampleAndConjugation.ExampleList)}
                _light={{bg: 'white', borderColor: 'black'}}        
                _dark={{bg: 'gray.700', borderColor: 'white'}}
                h={'25px'}
                padding={5}
                justifyContent={'center'}
                _pressed={{bg: 'gray.400'}}
            >
                <Text>Examples</Text>
            </Pressable>
            {['Verb - Group 1', 'Verb - Group 2', 'Verb - Group 3'].includes(word.type) && (
                <Pressable
                    onPress={() => setSelectedTab(WordExampleAndConjugation.ConjugationList)}
                    _light={{ bg: 'white', borderColor: 'black' }}
                    _dark={{ bg: 'gray.700', borderColor: 'white' }}
                    h={'25px'}
                    padding={5}
                    justifyContent={'center'}
                    borderLeftWidth={1}
                    _pressed={{bg: 'gray.400'}}
                >
                    <Text>Conjugations</Text>
                </Pressable>
            )}
        </Row>
    )
}
