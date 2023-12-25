import React, {useMemo, useState} from "react"
import { FlatList, Pressable, Text, Divider, Row, Column, Button, Spinner } from "native-base"
import { ListRenderItemInfo } from "react-native"
import { useWords, IWordList } from "../../utils/api/vocabulary"
import { MdList, MdAdd } from "react-icons/md"
import DataEmpty from "../DataEmpty"
import Error from "../Error"
import { IVocabularyFilters } from "./SearchVocabulary"
import ModalAddWord from "./ModalAddWord"

interface IWordListProps {
    filters?: IVocabularyFilters
}

export default function WordList(props: IWordListProps) {

    const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)

    const {
        data: words, 
        error: wordsError,
        isLoading: wordsIsLoading,
        isValidating: wordsIsValidating,
    } = useWords()


    const filteredVocabulary = useMemo(() => {
        if(words === undefined) return []

        const filters = props.filters

        if(filters === undefined) return words

        if(Object.values(filters).every(v => v === null)) return words

        let filteredWords = words

        if(filters.searchText !== null) {
            filteredWords = filteredWords.filter(word => 
                word.word.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
                word.reading.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
                word.meaning.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "")
            )
        }

        if(filters.category !== null) {
            filteredWords = filteredWords.filter(word => {
                return word.category !== null && word.category.name === filters.category;
            });
        }

        if(filters.level !== null) {
            filteredWords = filteredWords.filter(word => word.level === filters.level)
        }

        if(filters.type !== null) {
            filteredWords = filteredWords.filter(word => word.type === filters.type)
        }

        return filteredWords
    }, [words, props.filters])


    if (wordsError) return <Error message={wordsError.message} />

    if (wordsIsLoading || wordsIsValidating) return <Spinner />

    function header() {
        return (
            <Row justifyContent={'space-between'} alignItems={'center'} w={'100%'} mb={5} p={"10px"}>
                <Text fontSize={20} fontWeight={700}>Words({words?.length})</Text>
                <Button
                    onPress={() => {
                        setIsModalAddWordOpen(true)
                    }}
                    bg={'#D02C23'}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    startIcon={<MdAdd size={25} color="white" />}
                >
                    Add
                </Button>
            </Row>
        )
    }

    function items({item}: ListRenderItemInfo<IWordList>) {
        return (
            <Column
                p={"10px"}
                _light={{bg: 'white'}}
                _dark={{bg: 'gray.700'}}
                rounded={'md'}
            >
                <Text
                    fontSize={20}
                    fontWeight={700}
                >
                    {item.word} - {item.reading}
                </Text>
                <Divider/>
                <Text>{item.meaning}</Text>
            </Column>
        )
    }

    return (
        <>
            <FlatList
                w={"60%"}
                data={filteredVocabulary}
                ListHeaderComponent={header}
                renderItem={items}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<DataEmpty message="No words" />}
                ItemSeparatorComponent={() => <Divider mt={2} />}
            />
            <ModalAddWord
                isOpen={isModalAddWordOpen}
                onClose={() => {
                    setIsModalAddWordOpen(false)
                }}
            />

        </>
    )
}