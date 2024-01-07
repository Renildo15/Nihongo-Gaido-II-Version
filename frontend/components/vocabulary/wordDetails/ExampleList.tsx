import React, {useState} from "react";
import { Button, Row, Text, FlatList, Pressable, Box } from "native-base";
import { useExamples, IExampleList } from "../../../utils/api/example";
import { ListRenderItemInfo } from "react-native";
import { MdList, MdAdd } from "react-icons/md";
import DataEmpty from "../../DataEmpty";
import Error from "../../Error";

interface IExampleListProps {
    wordId: number
}

export default function ExampleList(props: IExampleListProps) {
    const {
        data: examples,
        error: examplesError,
        isLoading: examplesIsLoading,
        isValidating: examplesIsValidating
    } = useExamples(props.wordId)

    function headers(){
        return (
            <Row
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={5}
            >
                <Text>Examples sentences</Text>
                <Button
                    bg={'#D02C23'}
                    // onPress={() => setModalVisible(true)}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                >
                    Add example
                </Button>
            </Row>
        )

    }

    function items({item}: ListRenderItemInfo<IExampleList>) {
        return (
            <Row
                padding={5}
                _light={{bg: 'white', borderColor: 'black'}}        
                _dark={{bg: 'gray.700', borderColor: 'white'}}
                rounded={10}
                borderWidth={1}
                margin={2}
            >
                <Box>
                    <Text>{item.example}</Text>
                    <Text>{item.meaning}</Text>
                </Box>
                <Pressable>
                    <MdList size={25} color="#D02C23" />
                </Pressable>
            </Row>
        )
    }

    if(examplesError !== undefined) {
        return <Error message={examplesError.message}/>
    }

    if(examples === undefined || examplesIsLoading || examplesIsValidating) {
        return <Text>Loading...</Text>
    }

    return (
        <>
            <FlatList
                ListHeaderComponent={headers}
                ListEmptyComponent={<DataEmpty message={'No examples found'}/>}
                data={examples}
                renderItem={items}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    )

}