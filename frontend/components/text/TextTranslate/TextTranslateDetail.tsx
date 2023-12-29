import React from "react"
import { Text, Column, Row, Button } from "native-base"
import { useText } from "../../../utils/api/text"
// @ts-ignore
import HTMLRenderer from 'react-html-renderer'
import Error from "../../Error"


interface ITextDetailProps {
    textId: number
}

export default function TextTranslateDetail(props: ITextDetailProps) {
    const {
        data: text,
        error: textError,
        isLoading: textLoading,
    } = useText(props.textId)

    if (textError) {
        return <Error message={textError.message} />
    }

    if (textLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <Column 
        width={'100%'}  
        px={3} 
        py={2}
        space={4}
    >
            <Row
                justifyContent={'space-around'}
                alignItems={'flex-start'}
                mt={'10px'}
            >
                <Column 
                    space={4}
                    _dark={{
                        bg: 'gray.700',
                    }}
                    _light={{
                        bg: 'white',
                    }}
                    p={"10px"}
                    rounded={'md'}
                    w={'45%'}
                >
                    <Text fontWeight={600} fontSize={15} textAlign={'center'}>Original</Text>
                    <HTMLRenderer html={text?.text} components={{ h1: Paragraph, p :Paragraph }} />
                </Column>

                <Column 
                    space={4}
                    _dark={{
                        bg: 'gray.700',
                    }}
                    _light={{
                        bg: 'white',
                    }}
                    p={"10px"}
                    rounded={'md'}
                    w={'45%'}
                >
                    <Text fontWeight={600} fontSize={15} textAlign={'center'}>Translate</Text>
                    <HTMLRenderer html={text?.translate ??  '<p>oba</p>'} components={{ h1: Paragraph, p :Paragraph }} />
                </Column>
            </Row>
            <Row
                justifyContent={'space-around'}
                alignItems={'flex-start'}
                mt={'10px'}
            >
                <Column
                    space={4}
                    _dark={{
                        bg: 'gray.700',
                    }}
                    _light={{
                        bg: 'white',
                    }}
                    p={"10px"}
                    rounded={'md'}
                    w={'45%'}
                >   
                    <Text fontWeight={600} fontSize={15} textAlign={'center'}>Annotation</Text>
                    <HTMLRenderer  html={text?.annotation || '<p>Nenhuma anotação disponível</p>'}components={{ h1: Paragraph, p :Paragraph }} />
                    <Row
                        justifyContent={'space-around'}
                        alignItems={'flex-start'}
                        mt={'10px'}
                    >
                        <Button
                            bg={'#D02C23'}
                            _hover={{bg: '#ae251e'}}
                            _pressed={{bg: '#ae251e'}}
                        >
                            Edit text
                        </Button>
                        <Button
                            variant={'ghost'}
                            colorScheme={'red'}
                            
                        >
                            Delete text
                        </Button>
                    </Row>
                </Column>
            </Row>
        </Column>
    )
}

function Paragraph(props: any) {
    return (
        <Text fontSize={16} fontWeight={500}>{props.children}</Text>
    )
}