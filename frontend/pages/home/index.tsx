import React from "react";
import { Box, Text } from "native-base";
import { redirectIfNoCredentials } from "../../utils";
import { GetServerSidePropsContext } from "next";


export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    return redirectIfNoCredentials({ req, res });
}

export default function Home() {
    return (
        <Box>
            <Text>Home</Text>
        </Box>
    );
}