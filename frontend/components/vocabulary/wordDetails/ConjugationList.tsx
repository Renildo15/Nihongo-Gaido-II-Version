import React from "react";
import { Row, Text, Column } from "native-base";
import { useConjugations} from "../../../utils/api/conjugation";


interface IConjugationListProps {
    wordId: number
}

export default function ConjugationList( props: IConjugationListProps) {
    const {
        data:conjugation,
        isLoading: conjugationIsLoading,
    } = useConjugations(props.wordId)


    if(conjugation === undefined || conjugationIsLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <Row
            w={'100%'}
            p={4}
            _dark={{bg: 'gray.700'}}
            _light={{bg: 'white'}}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Column space={4}>
                <Text fontWeight={'bold'}>Present: {conjugation.present}</Text>
                <Text fontWeight={'bold'}>Negative: {conjugation.negative}</Text>
                <Text fontWeight={'bold'}>Past: {conjugation.past}</Text>
                <Text fontWeight={'bold'}>Te form: {conjugation.te_form}</Text>
            </Column>
            <Column space={4}>
                <Text fontWeight={'bold'}>Potential: {conjugation.potential}</Text>
                <Text fontWeight={'bold'}>Volitional: {conjugation.volitional}</Text>
                <Text fontWeight={'bold'}>Causative: {conjugation.causative}</Text>
                <Text fontWeight={'bold'}>Passive: {conjugation.passive}</Text>
            </Column>
            <Column space={4}>
                <Text fontWeight={'bold'}>Causative Passive: {conjugation.causative_passive}</Text>
                <Text fontWeight={'bold'}>Conditional: {conjugation.conditional}</Text>
                <Text fontWeight={'bold'}>Imperative: {conjugation.imperative}</Text>
            </Column>

        </Row>
    )
}