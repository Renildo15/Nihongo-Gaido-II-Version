import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../../utils";
import { BaseLayout } from "../../../components/home/BaseLayout";
import Translate from "../../../components/text/TextTranslate/Translate";
import { Box } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function TextTranslate() {
    return (
        <BaseLayout title="Text translate">
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                mt={'10px'}
            >
                <Translate />
            </Box>
        </BaseLayout>
            
    );
}