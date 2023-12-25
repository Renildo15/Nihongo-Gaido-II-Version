import React from "react"
import { Column, Text, Divider } from "native-base"
import { useWord } from "../../../utils/api/vocabulary"
import Error from "../../Error"

interface IWordDetailsProps {
    wordId: number
}

export default function WordDetailsAndExamples(props: IWordDetailsProps) {
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

    return (
        <Column
            justifyContent={'center'}
            alignItems={'center'}
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
        </Column>
    )
}
