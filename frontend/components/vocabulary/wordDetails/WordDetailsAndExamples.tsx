import React, {useState} from "react"
import { Column, Text, Divider, Row, Pressable } from "native-base"
import { useWord } from "../../../utils/api/vocabulary"
import Error from "../../Error"
import ExampleList from "./ExampleList"
import ConjugationList from "./ConjugationList"


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
            <Column>
                <Row
                    justifyContent={'space-around'}
                    space={23}
                >
                    <Pressable
                        onPress={() => setSelectedTab(WordExampleAndConjugation.ExampleList)}
                        _light={{bg: 'white', borderColor: 'black'}}        
                        _dark={{bg: 'gray.700', borderColor: 'white'}}
                        h={'25px'}
                        borderWidth={1}
                        rounded={10}
                        padding={5}
                        justifyContent={'center'}
                    >
                        <Text>Examples</Text>
                    </Pressable>
                    {['Verb - Group 1', 'Verb - Group 2', 'Verb - Group 3'].includes(word.type) && (
                        <Pressable
                            onPress={() => setSelectedTab(WordExampleAndConjugation.ConjugationList)}
                            _light={{ bg: 'white', borderColor: 'black' }}
                            _dark={{ bg: 'gray.700', borderColor: 'white' }}
                            h={'25px'}
                            borderWidth={1}
                            rounded={10}
                            padding={5}
                            justifyContent={'center'}
                        >
                            <Text>Conjugations</Text>
                        </Pressable>
                    )}
                </Row>
                {getCurrentTab()}
            </Column>
        </Column>
    )
}
