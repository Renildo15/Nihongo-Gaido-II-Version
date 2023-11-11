import React from "react";
import { useGrammars, IGrammarList } from "../../utils/api/grammar";
import { Heading, Row, Column, FlatList, Box, Pressable, Divider } from "native-base";
import { ListRenderItemInfo } from "react-native";

export default function GrammarList() {
    const {
        data: grammars,
        error: grammarsError,
        isLoading: grammarsIsLoading,
        isValidating: grammarsIsValidating,
        mutate: grammarsMutate
    } = useGrammars()

    function header() {
        return (
            <Row justifyContent={'space-around'} p={5} bg={'#D02C23'}>
                <Heading size={'sm'} color={'#f2f2f2'} w={'150px'}>
                    Grammar
                </Heading>
                <Heading size={'sm'} color={'#f2f2f2'} w={'150px'}>
                    Structure
                </Heading>
                <Heading size={'sm'} color={'#f2f2f2'} w={'150px'}>
                    Level
                </Heading>
                <Heading size={'sm'} color={'#f2f2f2'} w={'110px'}>
                    Action
                </Heading>
            </Row>
        )
    }

    function items({item}: ListRenderItemInfo<IGrammarList>) {
        return (
            <Row justifyContent={'space-around'} p={5} bg={'white'} >
                <Column  w={'150px'}>
                    <Pressable>
                        {item.grammar}
                    </Pressable>
                </Column>
                <Column w={'150px'}>
                    {item.structure}
                </Column>
                <Column w={'150px'}>
                    {item.level}
                </Column>
                <Row justifyContent={'space-around'} w={'110px'}>
                    <Pressable>
                        Edit
                    </Pressable>
                    <Pressable>
                        Delete
                    </Pressable>
                </Row>
            </Row>
        )
    }

    return (
        <Box p={5}>
            <FlatList
                data={grammars}
                ListHeaderComponent={header}
                ItemSeparatorComponent={() => <Divider bg={'#D02C23'} />}
                renderItem={items}
                keyExtractor={(item) => item.id.toString()}
            />
        </Box>
    )
}