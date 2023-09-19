import React from "react";
import { Box, HStack, VStack, Pressable, Text, Divider } from "@gluestack-ui/themed";
import Image from "next/image";
import Logo from "../../public/logo.png"


export function MenuLateral(){
    return(
        <HStack
            w={"250px"}
            bg = "#D02C23"
            h={"100vh"}
            justifyContent="center"
            alignItems="flex-start"
        >
            <VStack
                width={"100%"}
            >
                <Pressable
                    justifyContent="center"
                    alignItems="center"
                    p="16px"
                >
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={90}
                        height={90}
                        priority
                    />
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontFamily="Inter"
                        fontSize={24}
                        mt={4}
                    >
                        Nihongo Gaido
                    </Text>
                </Pressable>
                <Divider mt={9} bgColor="#fff" width={"100%"} h={"3px"}/>
            </VStack>
           
        </HStack>
    )
}