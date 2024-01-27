import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../../utils";
import { BaseLayout } from "../../../components/home/BaseLayout";
import Translate from "../../../components/text/TextTranslate/Translate";
import TranslateList from "../../../components/text/TextTranslate/TranslateList";
import { Row } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function TextTranslate() {
    return (
        <BaseLayout title="Text translate">
            <Row
                justifyContent={'space-around'}
                alignItems={'flex-start'}
                mt={'10px'}
                w={'100%'}
            >
                <Translate />
                <TranslateList />
            </Row>
        </BaseLayout>
            
    );
}