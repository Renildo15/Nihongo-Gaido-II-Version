import React, { useMemo, useState } from "react";
import { useGrammars, IGrammarList } from "../../utils/api/grammar";
import { Heading, Row, Column, FlatList, Box, Pressable, Divider, Text } from "native-base";
import { ListRenderItemInfo } from "react-native";
import { IGrammarsFilters } from "./SearchGrammar";
import ModalUpdateGrammar from "./ModalUpdateGrammar";
import ModalDeleteGrammar from "./ModalDeleteGrammar";
import GrammarSkeleton from "./GrammarSkeleton";
import DataEmpty from "../DataEmpty";
import Error from "../Error";
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

    const [grammarId, setGrammarId] = useState<number | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)

    const handleChangeGrammarId = (id: number) => {
        setGrammarId(id)
        setModalVisible(true)
    }

    const handleChangeDeleteGrammarId = (id: number) => {
        setGrammarId(id)
        setModalDeleteVisible(true)
    }

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
                        <Text>{item.grammar}</Text>
                    </Pressable>
                </Column>
                <Column w={'150px'}>
                    <Text>{item.structure}</Text>
                </Column>
                <Column w={'150px'}>
                    <Text>{item.level}</Text>
                </Column>
                <Row justifyContent={'space-around'} w={'110px'}>
                    <Pressable
                        onPress={() => handleChangeGrammarId(item.id)}
                        bg={'#F2F2F2'}
                        w={'40px'}
                        alignItems={'center'}
                        rounded={'md'}
                        shadow={1}
                    >
                        <Text color={'#D02C23'}>Edit</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => handleChangeDeleteGrammarId(item.id)}
                        bg={'#F2F2F2'}
                        w={'40px'}
                        alignItems={'center'}
                        rounded={'md'}
                        shadow={1}
                    >
                        <Text>Delete</Text>
                    </Pressable>
                </Row>
            </Row>
        )
    }

    if (grammarsIsLoading || grammarsIsValidating) {
        return (
            <Box p={5}>
                <GrammarSkeleton />
            </Box>
        )
    }

    if (grammarsError) {
        return (
            <Box p={5}>
                <Error message={'Error loading grammars'} />
            </Box>
        )
    }

    return (
        <Box p={5}>
            <FlatList
                data={filteredGrammars}
                ListHeaderComponent={header}
                ItemSeparatorComponent={() => <Divider bg={'#D02C23'} />}
                ListEmptyComponent={() => <DataEmpty message={'No grammar found'} />}
                renderItem={items}
                keyExtractor={(item) => item.id.toString()}
            />
            <ModalUpdateGrammar
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                grammarId={grammarId}
            />
            <ModalDeleteGrammar
                isOpen={modalDeleteVisible}
                onClose={() => setModalDeleteVisible(false)}
                grammarId={grammarId}
            />
        </Box>
    )
}