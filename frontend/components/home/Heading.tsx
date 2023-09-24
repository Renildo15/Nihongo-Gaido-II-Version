import React,{useContext} from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import ArrowLeft from "../../public/arrowLeft.svg";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";


export function Heading(){
    const {userInfo} = useContext(AuthContext)
    return(
        <Box
            bg="#D02C23"
            h={"60px"}
            w={"100%"}
            p={9}
            justifyContent="center"
        >
            <HStack 
                justifyContent="space-between"
                alignItems="center"
            >   
                <Image src={ArrowLeft} alt="ArrowLeft" />
                <Text
                    color="white"
                    fontSize={20}
                    fontWeight="bold"
                    fontFamily="Inter"
                >
                    Home
                </Text>
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    w={140}
                >
                    <Box
                        bg="white"
                        w={30}
                        h={30}
                        borderRadius={30}
                    ></Box>
                    <Text
                        color="white"
                        fontSize={18}
                        fontFamily="Inter"
                    >
                        {userInfo?.username}
                    </Text>
                </HStack>
            </HStack>
        </Box>
    )
}