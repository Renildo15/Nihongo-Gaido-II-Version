import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";

import { BaseLayout } from "../../components/home/BaseLayout";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { Box } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Profile() {
    
        return (
            <BaseLayout title="Profile">
                <Box
                    w={'100%'}
                >
                    <ProfileInfo />
                </Box>
            </BaseLayout>
                
        );
}