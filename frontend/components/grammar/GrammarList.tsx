import React, { useMemo } from "react";
import { useGrammars, IGrammarList } from "../../utils/api/grammar";
import { Heading, Row, Column, FlatList, Box, Pressable, Divider } from "native-base";
import { ListRenderItemInfo } from "react-native";
import { IGrammarsFilters } from "./SearchGrammar";
interface IGrammarListProps {
    filters?: IGrammarsFilters
}


export default function GrammarList(props: IGrammarListProps) {
    const {
        data: grammars,
        error: grammarsError,
        isLoading: grammarsIsLoading,
        isValidating: grammarsIsValidating,
        mutate: grammarsMutate
    } = useGrammars()

    const filteredGrammars = useMemo(() => {
        if (grammars === undefined) return []

        const filters = props.filters

        if (filters === undefined) return grammars

        if (Object.values(filters).every(v => v === null)) return grammars

        let _filteredGrammars = grammars

        if (filters.searchText !== null) {
            _filteredGrammars = _filteredGrammars.filter(grammar => 
                grammar.grammar.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
                grammar.structure.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "")
            )
        }

        if (filters.level !== null) {
            _filteredGrammars = _filteredGrammars.filter(grammar => grammar.level === filters.level)
        }

        if (filters.month !== null) {
            _filteredGrammars = _filteredGrammars.filter(grammar => {
                if (
                    new Date(grammar.created_at).getFullYear() === filters.month?.year &&
                    new Date(grammar.created_at).getMonth() + 1 === filters.month?.month
                ) return true
            })
        }

        return _filteredGrammars
    }, [grammars, props.filters])

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
                data={filteredGrammars}
                ListHeaderComponent={header}
                ItemSeparatorComponent={() => <Divider bg={'#D02C23'} />}
                ListEmptyComponent={() => <Heading size={'sm'}>No grammar found</Heading>}
                renderItem={items}
                keyExtractor={(item) => item.id.toString()}
            />
        </Box>
    )
}