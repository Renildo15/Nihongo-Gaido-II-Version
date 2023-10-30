import React, {FunctionComponent} from "react";
import { Box, VStack, HStack } from "@gluestack-ui/themed";

import Head from "next/head";

import { MenuLateral } from "./MenuLateral";
import { Heading } from "./Heading";

type Props = {
    children: React.ReactNode;
    title: string;
}

export const HomeDefaultPage: FunctionComponent<Props> = ({children, title}) => {
    return(
        <VStack maxWidth={"1900px"}>
            <Head>
                <title>{title}</title>
            </Head>
            <HStack flexDirection={'row'} width={'100%'}>
                <MenuLateral />
                <Box width={'1131px'}>
                    <Heading title={title} />
                    {children}
                </Box>
            </HStack>
        </VStack>
    )
}