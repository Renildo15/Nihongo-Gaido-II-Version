import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";

import { BaseLayout } from "../../components/home/BaseLayout";
import GrammarList from "../../components/grammar/GrammarList";
import SearchGrammar, { IGrammarsFilters } from "../../components/grammar/SearchGrammar";
export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Grammar() {
    const [filters, setFilters] = React.useState<IGrammarsFilters>()
    return (
        <BaseLayout title="Grammar">
            <SearchGrammar onFiltersChanged={setFilters} />
            <GrammarList filters={filters} />
        </BaseLayout>
            
    );
}