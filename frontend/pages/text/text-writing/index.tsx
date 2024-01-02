import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../../utils";
import { BaseLayout } from "../../../components/home/BaseLayout";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}


export default function TextWriting() {
    return (
        <BaseLayout title="Text writing">
            <div>Text writing</div>
        </BaseLayout>
            
    );
}