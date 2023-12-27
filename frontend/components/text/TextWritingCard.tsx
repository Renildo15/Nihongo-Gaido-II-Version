import React from "react"
import { MdBook } from "react-icons/md"
import { Column, Pressable, Text, Box } from "native-base"

export default function TextWritingCard() {
    return (
        <Pressable
            p={'10px'}
            _hover={{
                bg: 'gray.500'
            
            
            }}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            rounded={'md'}
            _dark={{
                borderColor: 'gray.700',
                bg: 'gray.700',
            }}
            _light={{
                borderColor: 'gray.100',
                bg: 'gray.100',
            }}
            h={'200px'}
            w={'200px'}
        >
            <Column
                space={2}
            >
                <Box
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <MdBook size={50} color={'white'}/>
                </Box>
                <Text
                    textAlign={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}
                >
                    Writing
                </Text>
                <Text
                    textAlign={'justify'}
                    fontSize={'sm'}
                    fontWeight={'400'}
                >
                    Here you can practice your writing skills.
                </Text>
            </Column>
        </Pressable>
    )
}