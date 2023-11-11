import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";

import { BaseLayout } from "../../components/home/BaseLayout";
import GrammarList from "../../components/grammar/GrammarList";
import GrammarFilters from "../../components/grammar/GrammarFilters";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Grammar() {

    return (
        <BaseLayout title="Grammar">
            <GrammarFilters />
            <GrammarList />
        </BaseLayout>
            
    );
}