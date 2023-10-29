import { Box } from "@gluestack-ui/themed";

import React from "react";
import {
  Button,
  HStack,
  VStack,
  Pressable,
  Text,
  Divider,
} from "@gluestack-ui/themed";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Home from "../../public/home.svg";
import Word from "../../public/word.svg";
import Grammar from "../../public/grammar.svg";
import Text_Icon from "../../public/text.svg";
import { MdHome, MdAccountCircle, MdLogout } from 'react-icons/md'
import { useRouter } from "next/router";
import axios from "axios";

export function MenuLateral() {
  const router = useRouter();
  const logout = () => {
    axios.post("/api/auth/logout").catch(() => router.push("/login"));
  };
  return (
    <VStack h={'100vh'} w={'235px'} bg={'#D02C23'}>
      <VStack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          w={"100%"}
          p={'15px'}
          sx={{
              justifyContent: "center",
              alignItems: "center",
          }} 
        >
            <Pressable onPress={() => router.push('/home')}>
                <Image src={Logo} alt="Logo" width={100} height={100} />
            </Pressable>
            <Text fontSize={'18px'} fontWeight={'600'} color={'white'}>Nihongo Gaido</Text>
        </Box>
        <VStack w={'100%'} h={'480px'} alignItems={'center'} justifyContent={'space-around'}>
            <Box justifyContent={'flex-start'} w={'65%'} h={'28%'} p={'10px'} >
                <Button onPress={() => router.push('/home')}>
                    <HStack flexDirection={'row'} alignItems={'center'}>
                        <MdHome size={20} color={'white'} />
                        <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Home</Text>
                    </HStack>
                </Button>
                <Button mt={'10px'} onPress={() => router.push('/grammar')}>
                    <HStack flexDirection={'row'} alignItems={'center'}>
                        <Image src={Grammar} alt="Home" width={20} height={20} />
                        <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Gramática</Text>
                    </HStack>
                </Button>
                <Button mt={'10px'} onPress={() => router.push('/vocabulary')}>
                    <HStack flexDirection={'row'} alignItems={'center'}>
                        <Image src={Word} alt="Home" width={20} height={20} />
                        <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Vocabulário</Text>
                    </HStack>
                </Button>
                <Button mt={'10px'} onPress={() => router.push('/text')}>
                    <HStack flexDirection={'row'} alignItems={'center'}>
                        <Image src={Text_Icon} alt="Home" width={20} height={20} />
                        <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Texto</Text>
                    </HStack>
                </Button> 
            </Box>
            <Box justifyContent={'flex-start'} w={'65%'} h={'28%'} p={'10px'} >
                <Button onPress={() => router.push('//profile')}>
                        <HStack flexDirection={'row'} alignItems={'center'}>
                            <MdAccountCircle size={20} color={'white'} />
                            <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Perfil</Text>
                        </HStack>
                </Button>
                <Button mt={'10px'} onPress={logout}>
                    <HStack flexDirection={'row'} alignItems={'center'}>
                        <MdLogout size={20} color={'white'} />
                        <Text ml ={'2px'} fontSize={'16px'} fontWeight={'400'} color={'white'}>Sair</Text>
                    </HStack>
                </Button>
            </Box>
        </VStack>
      </VStack>
    </VStack>
  );
}
