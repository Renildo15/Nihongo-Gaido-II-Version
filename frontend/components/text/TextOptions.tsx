import React from "react"
import { Column, Row, Text, Box } from "native-base"
import TextTranslateCard from "./TextTranslateCard"
import TextWritingCard from "./TextWritingCard"

export default function TextOptions() {
    return (
        <Column
            p={'10px'}
            space={2}
            justifyContent={'center'}
            alignItems={'center'}
            h={'60vh'}
        >
            <Text
                textAlign={'center'}
                fontSize={'xl'}
                fontWeight={'bold'}
            >
                Choose an option
            </Text>
            <Row 
                w={'50%'}
                space={2}
                justifyContent={'space-around'}
                alignItems={'center'}
                p={'10px'}
                // _dark={{
                //     borderColor: 'gray.700',
                //     bg: 'gray.700',
                // }}
                // _light={{
                //     borderColor: 'gray.100',
                //     bg: 'gray.100',
                // }}
                rounded={'md'}
            >
                <TextTranslateCard />
                <TextWritingCard />
            </Row>
        </Column>
    )
}