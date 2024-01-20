import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../../utils";
import { BaseLayout } from "../../../components/home/BaseLayout";
import WritingCreate from "../../../components/text/TextWriting/WritingCreate";
import WritingList from "../../../components/text/TextWriting/WritingList";
import { Row } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}


export default function TextWriting() {
    return (
        <BaseLayout title="Text writing">
            <Row
                justifyContent={'space-around'}
                alignItems={'flex-start'}
                mt={'10px'}
                w={'100%'}
            >
                <WritingCreate />
                <WritingList />
            </Row>
        </BaseLayout>
            
    );
}