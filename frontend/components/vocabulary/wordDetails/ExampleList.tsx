import React, {useState} from "react";
import { Row, Text, FlatList, Pressable, Box } from "native-base";
import { useExamples, IExampleList } from "../../../utils/api/example";
import { ListRenderItemInfo } from "react-native";
import { MdList, MdAdd } from "react-icons/md";
import ModalAddExample from "./ModalAddExample"
import ModalExample from "./ModalExample";
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

    const [isModalExampelOpen, setIsModalExampleOpen] = useState(false)
    const [exampleId, setExampleId] = useState<number>(0)
    
    function handleUpdateExample(exampleId: number) {
        setExampleId(exampleId)
        setIsModalExampleOpen(true)
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
                <Pressable
                    onPress={() => handleUpdateExample(item.id)}
                >
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
                ListEmptyComponent={<DataEmpty message={'No examples found'}/>}
                data={examples}
                renderItem={items}
                keyExtractor={(item) => item.id.toString()}
            />

            <ModalExample
                isOpen={isModalExampelOpen}
                onClose={() => setIsModalExampleOpen(false)}
                exampleId={exampleId}
                wordId={props.wordId}
            />
        </>
    )

}