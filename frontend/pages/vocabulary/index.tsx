import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";
import { BaseLayout } from "../../components/home/BaseLayout";
import WordList from "../../components/vocabulary/VocabularyList";
import { Box } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}


export default function Vocabulary() {
    return (
        <BaseLayout title="Vocabulary">
            <Box
                justifyContent={'center'}
                alignItems={'center'}
            >
                <WordList />    
            </Box>
        </BaseLayout>
            
    );
}