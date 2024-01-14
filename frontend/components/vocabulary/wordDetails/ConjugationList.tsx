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
        <Column
            borderWidth={1}
            w={'100%'}
        >
            <Row
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={5}
                w={'100%'}
            >
                <Text>Conjugations</Text>
            </Row>
            <Column>
                <Text>Present: {conjugation.present}</Text>
                <Text>Negative: {conjugation.negative}</Text>
                <Text>Past: {conjugation.past}</Text>
                <Text>Te form: {conjugation.te_form}</Text>
                <Text>Potential: {conjugation.potential}</Text>
                <Text>Volitional: {conjugation.volitional}</Text>
                <Text>Causative: {conjugation.causative}</Text>
                <Text>Passive: {conjugation.passive}</Text>
                <Text>Causative Passive: {conjugation.causative_passive}</Text>
                <Text>Conditional: {conjugation.conditional}</Text>
                <Text>Imperative: {conjugation.imperative}</Text>
            </Column>

        </Column>
    )
}