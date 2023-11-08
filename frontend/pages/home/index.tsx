import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";

import { BaseLayout } from "../../components/home/BaseLayout";


export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Home() {

    return (
        <BaseLayout title="Home">
        
        </BaseLayout>
            
    );
}