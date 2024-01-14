import React, { useState } from "react";
import { Button, Row, Text, Column } from "native-base";
import { useConjugations} from "../../../utils/api/conjugation";
import { MdAdd } from "react-icons/md";
import Error from "../../Error";
import ModalAddConjugation from "./ModalAddConjugation";

interface IConjugationListProps {
    wordId: number
}

export default function ConjugationList( props: IConjugationListProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {
        data:conjugation,
        isLoading: conjugationIsLoading,
    } = useConjugations(props.wordId)

    const handleOpen = () => {
        setIsOpen(true)
    }


    if(conjugation === undefined || conjugationIsLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <Column
            borderWidth={1}
            w={'100%'}
        >
            <Row
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={5}
                w={'100%'}
            >
                <Text>Conjugations</Text>
                <Button
                    bg={'#D02C23'}
                    _hover={{bg: '#ae251e'}}
                    _pressed={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                    onPress={handleOpen}
                >
                    Add conjugation
                </Button>
            </Row>
            <Column>
                <Text>Present: {conjugation.present}</Text>
                <Text>Negative: {conjugation.negative}</Text>
                <Text>Past: {conjugation.past}</Text>
                <Text>Te form: {conjugation.te_form}</Text>
                <Text>Potential: {conjugation.potential}</Text>
                <Text>Volitional: {conjugation.volitional}</Text>
                <Text>Causative: {conjugation.causative}</Text>
                <Text>Passive: {conjugation.passive}</Text>
                <Text>Causative Passive: {conjugation.causative_passive}</Text>
                <Text>Conditional: {conjugation.conditional}</Text>
                <Text>Imperative: {conjugation.imperative}</Text>
            </Column>

            <ModalAddConjugation
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
                wordId={props.wordId}
            />
        </Column>
    )
}