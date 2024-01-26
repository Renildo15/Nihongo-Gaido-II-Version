import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";

import { BaseLayout } from "../../components/home/BaseLayout";
import GrammarList from "../../components/grammar/GrammarList";
import SearchGrammar, { IGrammarsFilters } from "../../components/grammar/SearchGrammar";
import { Box } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Grammar() {
    const [filters, setFilters] = React.useState<IGrammarsFilters>()
    return (
        <BaseLayout title="Grammar">
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                flex={2}
            >
                <SearchGrammar onFiltersChanged={setFilters} />
                <GrammarList filters={filters} />
            </Box>
        </BaseLayout>
            
    );
}