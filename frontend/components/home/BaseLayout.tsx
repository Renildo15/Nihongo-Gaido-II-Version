import React, {FunctionComponent} from "react";
import { VStack, HStack, Box, ScrollView } from "native-base";

import Head from "next/head";

import { LateralMenu } from "./LateralMenu";
import { Heading } from "./Heading";

type Props = {
    children: React.ReactNode;
    title: string;
}

export const BaseLayout: FunctionComponent<Props> = ({children, title}) => {
    return(
        <VStack 
            maxW={'1800px'} 
            _light={{
                bg:'#f2f2f2'
            }}
            _dark={{
                bg:'#333333'
            }}
        >
            <Head>
                <title>{title}</title>
            </Head>
            <HStack flexDirection={'row'}  w={'100%'}>
                <LateralMenu />
                <VStack w={'82.8%'}>
                    <Heading title={title} />
                        <Box mt={30}>
                            {children}
                        </Box>
                </VStack>
            </HStack>
        </VStack>
    )
}