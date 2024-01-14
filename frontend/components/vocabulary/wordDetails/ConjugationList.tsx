import React from "react";
import { Button, Row, Text, FlatList, Pressable, Box, Column } from "native-base";
import { useConjugations, IConjugationList} from "../../../utils/api/conjugation";
import { ListRenderItemInfo } from "react-native";
import { MdList, MdAdd } from "react-icons/md";
import Error from "../../Error";
import DataEmpty from "../../DataEmpty";

interface IConjugationListProps {
    wordId: number
}

export default function ConjugationList( props: IConjugationListProps) {

    const {
        data:conjugation,
        error: conjugationError,
        isLoading: conjugationIsLoading,
        mutate: conjugationMutate,
    } = useConjugations(props.wordId)


    if(conjugationError !== undefined) {
        return <Error message={conjugationError.message}/>
    }

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
                <Button
                    bg={'#D02C23'}
                    onPress={()=>{}}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                >
                    Add conjugation
                </Button>
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