import React from "react";
import { VStack, Text, Heading, Box, HStack, Input, InputField, Select} from '@gluestack-ui/themed';
import { useGrammars } from "@/utils/api/grammar";

function GrammarSearch() {
    return (
        <Box w={"100%"} h={"100%"} p={4}>
            <HStack>
                <Input>
                    <InputField
                        label="Gramática"
                        placeholder="Gramática"
                        type="text"
                    />
                </Input>
                <Select
                    label="Nível"
                    placeholder="Nível"
                    type="text"
                />
                <Select
                    label="Data"
                    placeholder="Data"
                    type="text"
                />
            </HStack>
        </Box>
    )
}

export function GrammarList() {
    const {
        data: grammars,
        error: grammarsError,
        isLoading: grammarsIsLoading,
        isValidating: grammarsIsValidating,
        mutate: grammarsMutate
    } = useGrammars();

    console.log(grammars)

    return (
        <VStack>
            <GrammarSearch />
            <Text>Grammar list</Text>
        </VStack>
    )
}
