import React, { useState } from "react"
import { Input, Column, FormControl, Toast, Text, Button } from "native-base"
import TextEditor from "../TextEditor"

export default function Translate() {
    
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [translate, setTranslate] = useState<string>('')
    const [annotation, setAnnotation] = useState<string>('')

    const handleChasngeText = (text: string) => {
        setText(text)
    }
    console.log(text)
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
                    key="title-label"
                    testID="title-label"
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
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    testID="title-input"
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
                    <TextEditor content={text} onContentChanged={handleChasngeText}/>
                </FormControl>
            </Column>
            <Button>
                Save
            </Button>
        </Column>
    )
}