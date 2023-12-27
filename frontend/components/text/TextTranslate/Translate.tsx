import React, { useState } from "react"
import { Input, Column, FormControl, Toast, Text } from "native-base"
import { OutputData } from '@editorjs/editorjs';
import dynamic from "next/dynamic";

const TextEditor = dynamic(
    () => import("../TextEditor"),
    { ssr: false } // Indique que este componente não deve ser renderizado no lado do servidor (SSR)
);

export default function Translate() {
    return (
        <Column
            space={4}
            borderWidth={1}
            w={'70%'}
            p={'10px'}
            rounded={'md'}
            _dark={{
                borderColor: 'white',
                bg: 'gray.700',
            }}
            _light={{
                borderColor: 'gray.700',
                bg: 'gray.100',
            }}
        >
            <Column>

            <FormControl>
                <FormControl.Label
                    _text={{
                        fontWeight: 'bold',
                        fontSize: 'lg'
                    }}
                >
                    Title
                </FormControl.Label>
                <Input
                    placeholder={'Title'}
                    shadow={1}
                    _focus={{borderColor: '#D02C23'}}
                    _hover={{borderColor: '#D02C23'}}
                    focusOutlineColor={'#D02C23'}
                    _light={{
                        bg: 'white'
                    }}
                    _dark={{
                        bg: '#262626'
                    }}
                />
            </FormControl>
            <FormControl>
                <FormControl.Label
                    _text={{
                        fontWeight: 'bold',
                        fontSize: 'lg'
                    }}
                >
                    Text
                </FormControl.Label>
                <TextEditor/>
            </FormControl>
            </Column>
        </Column>
    )
}