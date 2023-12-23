import React from "react"
import { FlatList, Pressable, Text, Divider, Row, Column, Button, Spinner } from "native-base"
import { ListRenderItemInfo } from "react-native"
import { useWords, IWordList } from "../../utils/api/vocabulary"
import { MdList, MdAdd } from "react-icons/md"
import DataEmpty from "../DataEmpty"
import Error from "../Error"


export default function WordList() {
    const {
        data: words, 
        error: wordsError,
        isLoading: wordsIsLoading,
        isValidating: wordsIsValidating,
    } = useWords()


    if (wordsError) return <Error message={wordsError.message} />

    if (wordsIsLoading || wordsIsValidating) return <Spinner />

    function header() {
        return (
            <Row justifyContent={'space-between'} alignItems={'center'} w={'100%'} mb={5} p={"10px"}>
                <Text fontSize={20} fontWeight={700}>Words({words?.length})</Text>
                <Button
                    onPress={() => {}}
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
        <FlatList
            w={"60%"}
            data={words}
            ListHeaderComponent={header}
            renderItem={items}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<DataEmpty message="No words" />}
            ItemSeparatorComponent={() => <Divider mt={2} />}
        />
    )
}