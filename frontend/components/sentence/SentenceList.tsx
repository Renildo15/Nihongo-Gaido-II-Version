import React, { useState } from "react"
import { ISentenceList } from "../../utils/api/sentence"
import { ListRenderItemInfo } from "react-native"
import { FlatList, Pressable, Text, Divider, Row, Column, Button } from "native-base"
import { MdList, MdAdd } from "react-icons/md"
import DataEmpty from "../DataEmpty"

interface ISentenceListProps {
    sentences: ISentenceList[] | undefined
}

export default function SentenceList(props: ISentenceListProps) {

    function header() {
        return (
            <Row justifyContent={'space-between'} alignItems={'center'} w={'100%'} mb={5}>
                <Text fontSize={20} fontWeight={700}>Sentences({props.sentences?.length})</Text>
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

    function items({item}: ListRenderItemInfo<ISentenceList>) {
        return (
            <Column
                w={'100%'} 
                p={'10px'}
                _light={{bg: 'white'}}
                _dark={{bg: 'gray.700'}}
                rounded={'md'}
            >
                <Row justifyContent={'space-between'}>
                    <Text fontSize={20} fontWeight={700}>{item.sentence}</Text>
                    <Pressable onPress={() => {}}>
                        <MdList size={24} color={'#D02C23'}/>
                    </Pressable>
                </Row>
                <Text fontSize={16} fontWeight={500}>{item.translate}</Text>
                {item.annotation && <Text fontSize={16} fontWeight={500}>{item.annotation}</Text>}
            </Column>
        )
    }


    return (
        <FlatList
            data={props.sentences}
            renderItem={items}
            ListHeaderComponent={header}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<DataEmpty message="No sentences"/>}
            ItemSeparatorComponent={() => <Divider bg={'none'} mt={2} />}
        />
    )
}