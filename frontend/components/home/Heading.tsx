import React,{useContext} from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import ArrowLeft from "../../public/arrowLeft.svg";
import Default from "../../public/default.jpg"
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useProfile } from "@/utils/api";

interface IHeadingProps {
    title: string;
}

export function Heading({title}: IHeadingProps){
    const {userInfo} = useContext(AuthContext)

    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading,
        isValidating: profileIsValidating,
        mutate: profileMutate,
    } = useProfile(userInfo?.id)

    console.log("profile", profile)

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
                    {title}
                </Text>
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    w={140}
                >
                 
                    <Image src={profile?.avatar || Default} alt="Avatar" width={30} height={30} />
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