import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";
import { BaseLayout } from "../../components/home/BaseLayout";
import TextOptions from "../../components/text/TextOptions";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Text() {
    return (
        <BaseLayout title="Text">
            <TextOptions />
        </BaseLayout>
            
    );
}