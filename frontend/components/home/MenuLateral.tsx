import React from "react";
import { Button, HStack, VStack, Pressable, Text, Divider } from "@gluestack-ui/themed";
import Image from "next/image";
import Logo from "../../public/logo.png"
import Home from "../../public/home.svg"
import Word from "../../public/word.svg"
import Grammar from "../../public/grammar.svg"
import Text_Icon from "../../public/text.svg"
import Profile from "../../public/profile.svg"
import logout_icon from "../../public/logout.svg"

import { useRouter } from "next/router";
import axios from "axios";

export function MenuLateral(){
    const router = useRouter();
    const logout = () => {
        axios.post("/api/auth/logout").catch(() => router.push("/login"))
    } 
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
                h={"100%"}
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

                <VStack
                    h={"473px"}
                    justifyContent="space-around"
                    alignItems="center"
                    space="10px"
                >
                    <VStack
                        width={"50%"}    
                    > 
                        <Button
                            variant="link"
                            flexDirection="column"
                            alignItems="flex-start"
                            w={"100%"}
                            gap={20}
                            onPress={() => router.push("/home")}
                            isPressed={router.pathname === "/home"}
                        >
                                <HStack>
                                    <Image
                                        src={Home}
                                        alt="Home"
                                        width={20}
                                        height={16}
                                        priority
                                    />
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontFamily="Inter"
                                        fontSize={16}
                                        ml={4}
                                    >
                                        Home
                                    </Text>
                                </HStack>
                        </Button>

                        <Button
                            variant="link"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            w={"100%"}
                        >
                                <HStack>
                                    <Image
                                        src={Grammar}
                                        alt="Grammar"
                                        width={20}
                                        height={16}
                                        priority
                                    />
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontFamily="Inter"
                                        fontSize={16}
                                        ml={4}
                                    >
                                        Gramática
                                    </Text>
                                </HStack>
                        </Button>

                        <Button
                            variant="link"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            w={"100%"}
                            gap={20}
                            
                        >
                                <HStack>
                                    <Image
                                        src={Word}
                                        alt="Palavras"
                                        width={30}
                                        height={25}
                                        priority
                                    />
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontFamily="Inter"
                                        fontSize={16}
                                        ml={4}
                                    >
                                        Palavras
                                    </Text>
                                </HStack>
                        </Button>

                        <Button
                            variant="link"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            w={"100%"}
                            gap={20}
                            
                        >
                                <HStack>
                                    <Image
                                        src={Text_Icon}
                                        alt="Texto"
                                        width={26}
                                        height={26}
                                        priority
                                    />
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontFamily="Inter"
                                        fontSize={16}
                                        ml={4}
                                    >
                                        Texto
                                    </Text>
                                </HStack>
                        </Button>
                    </VStack>

                    <VStack
                        width={"50%"}
                    > 
                        <Button
                            variant="link"
                            flexDirection="column"
                            alignItems="flex-start"
                            w={"100%"}
                        >
                                <HStack>
                                    <Image
                                        src={Profile}
                                        alt="Profile"
                                        width={22}
                                        height={24}
                                        priority
                                    />
                                    <Text
                                        color="white"
                                        fontWeight="bold"
                                        fontFamily="Inter"
                                        fontSize={16}
                                        ml={4}
                                    >
                                        Perfil
                                    </Text>
                                </HStack>
                        </Button>

                        <Button
                            variant="link"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            w={"100%"}
                            gap={20}
                            onPress={() => logout()}
                        >
                            <HStack>
                                <Image
                                    src={logout_icon}
                                    alt="Logout"
                                    width={22}
                                    height={21}
                                    priority
                                />
                                <Text
                                    color="white"
                                    fontWeight="bold"
                                    fontFamily="Inter"
                                    fontSize={16}
                                    ml={4}
                                >
                                    Sair
                                </Text>
                            </HStack>
                        </Button>
                    </VStack>
                </VStack>
            </VStack>
           
        </HStack>
    )
}