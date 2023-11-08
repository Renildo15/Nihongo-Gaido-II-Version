import React from "react";
import { Box, HStack, Text } from "native-base";
import { MdArrowBack } from "react-icons/md";
import Default from "../../public/images/default.jpg"
import Image from "next/image";
import { useProfile, WhoIam } from "../../utils/api/user";
interface IHeadingProps {
    title: string;
}

export function Heading({title}: IHeadingProps){
    const {
        data: userInfo,
        error: userError,
        isLoading: userIsLoading,
        isValidating: userIsValidating,
        mutate: userRevalidate
    } = WhoIam()

    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading,
        isValidating: profileIsValidating,
        mutate: profileMutate,
    } = useProfile(userInfo?.id)

    return(
        <Box
            bg="#D02C23"
            h={"60px"}
            p={9}
            justifyContent="center"
        >
            <HStack 
                justifyContent="space-between"
                alignItems="center"
                flexDirection={'row'}
            >   
                <MdArrowBack size={30} color={'white'} />
                <Text
                    color="white"
                    fontSize={20}
                    fontWeight="bold"
                >
                    {title}
                </Text>
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    w={140}
                >
                <Box style={{ borderRadius: 50, overflow: 'hidden' }}>
                    {profile?.avatar 
                            ? (
                                <Image
                                    src={`http://127.0.0.1:8000${profile.avatar}`}
                                    alt="Avatar"
                                    width={30}
                                    height={30}
                                    objectFit="cover"
                                />
                            )
                        :   (
                                <Image
                                    src={Default}
                                    alt="Avatar"
                                    width={30}
                                    height={30}
                                    objectFit="cover"
                                />
                            )   
                        }
                    </Box>
                    <Text
                        color="white"
                        fontSize={18}
                    >
                        {userInfo?.username}
                    </Text>
                </HStack>
            </HStack>
        </Box>
    )
}