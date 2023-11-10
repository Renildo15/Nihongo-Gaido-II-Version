import React, {FunctionComponent} from "react";
import { Box, VStack, HStack } from "native-base";

import Head from "next/head";

import { LateralMenu } from "./LateralMenu";
import { Heading } from "./Heading";

type Props = {
    children: React.ReactNode;
    title: string;
}

export const BaseLayout: FunctionComponent<Props> = ({children, title}) => {
    return(
        <VStack maxW={'1900px'} bg={'#f2f2f2'}>
            <Head>
                <title>{title}</title>
            </Head>
            <HStack flexDirection={'row'}  w={'100%'}>
                <LateralMenu />
                <Box w={'82.8%'}>
                    <Heading title={title} />
                    {children}
                </Box>
            </HStack>
        </VStack>
    )
}