import React from "react";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "../../utils";
import { BaseLayout } from "../../components/home/BaseLayout";
import TextOptions from "../../components/text/TextOptions";
import { Box , Text as Textt} from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Text() {
    return (
        <BaseLayout title="Text">
            <Box
                w={'100%'}
            >
                <Textt
                    textAlign={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}
                >
                    Choose an option
                </Textt>
                <TextOptions />
            </Box>
        </BaseLayout>
            
    );
}