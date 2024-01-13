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
        data:conjugations,
        error: conjugationsError,
        isLoading: conjugationsIsLoading,
        mutate: conjugationsMutate,
    } = useConjugations(props.wordId)


    if(conjugationsError !== undefined) {
        return <Error message={conjugationsError.message}/>
    }

    if(conjugations === undefined || conjugationsIsLoading) {
        return <Text>Loading...</Text>
    }

    function headers(){
        return (
            <Row
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={5}
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
        )

    }

    function items({item}: ListRenderItemInfo<IConjugationList>) {
        return (
            <Column>
                <Text>{item.present}</Text>
                <Text>{item.negative}</Text>
                <Text>{item.past}</Text>
                <Text>{item.te_form}</Text>
                <Text>{item.potential}</Text>
                <Text>{item.volitional}</Text>
                <Text>{item.causative}</Text>
                <Text>{item.passive}</Text>
                <Text>{item.causative_passive}</Text>
                <Text>{item.conditional}</Text>
                <Text>{item.imperative}</Text>
            </Column>
        )
    }

    return (
        <>
            <FlatList
                data={conjugations}
                renderItem={items}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={headers}
                ListEmptyComponent={DataEmpty}
            />

        </>
    )
}