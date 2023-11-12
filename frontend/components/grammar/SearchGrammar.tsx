import React, { useState } from "react";
import { Row, Column, Input, Button } from "native-base";
import FilterByLevel from "./FilterByLevel";
import FilterByMonth, { IGrammarFilterMonth } from "./FilterByMonth";
import { MdSearch, MdAdd } from "react-icons/md";

export interface IGrammarsFilters {
    searchText: string | null
    level: string | null
    month: IGrammarFilterMonth | null
}

interface ISearchGrammarProps {
    onFiltersChanged?: (filters: IGrammarsFilters) => void
}

export default function SearchGrammar (props: ISearchGrammarProps) {
    const [filters, setFilters] = useState<IGrammarsFilters>({
        searchText: null,
        level: null,
        month: null
    })

    function handleFilterChanged(filters: IGrammarsFilters) {
        setFilters(filters)

        if (props.onFiltersChanged !== undefined) {
            props.onFiltersChanged(filters)
        }
    }

    return (
        <Row justifyContent={'space-between'} p={5}>
            <Column space={'20px'}> 
                <Input
                    placeholder="Search grammar"
                    bg={'white'}
                    w={'700px'}
                    size={'md'}
                    onChangeText={text => handleFilterChanged({...filters, searchText: text})}
                    value={filters.searchText ?? ""}
                    InputRightElement={<MdSearch size={25} color="#D02C23" />}
                />
                <Column width={'200px'}>
                    <FilterByLevel
                        onLevelSelected={level => handleFilterChanged({...filters, level})}
                    />

                </Column>
            </Column>
            <Column space={'20px'} alignItems={'flex-end'}>
                <FilterByMonth
                    onMonthSelected={month => handleFilterChanged({...filters, month})}
                />
                <Button
                    bg={'#D02C23'}
                    onPress={() => {}}
                    _hover={{bg: '#ae251e'}}
                    size={'md'}
                    w={'140px'}
                    startIcon={<MdAdd size={25} color="white" />}
                >
                    Add grammar
                </Button>
            </Column>

        </Row>
    )
}