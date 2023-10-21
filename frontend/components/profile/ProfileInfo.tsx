import React,{ useState } from "react";
import { useProfile, WhoIam } from "@/utils/api/user";
import { Box, VStack, HStack, Text, Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { applyPhoneMask } from "@/utils/validations";
import Image from "next/image";
import Default from "../../public/default.jpg"
import ModalProfile from "./ModalProfile";
import { format } from 'date-fns'

export default function ProfileInfo(){
    const [isOpen, setIsOpen] = useState(false)
    const {
        data: userInfo,
        error: userError
    } = WhoIam()
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading,
        isValidating: profileIsValidating,
        mutate: profileMutate,
    } = useProfile(userInfo?.id)

    console.log("Avatar URL: ", profile?.avatar);

    if(profileIsLoading || profileIsValidating) {
        return(
            <Box justifyContent="center" alignItems="center" w={"100%"} >
                <Spinner size="large" color="$primary400" />
            </Box>
        )
    }

    if (userError) {
        return (
            <Box justifyContent="center" alignItems="center" w={"100%"} >
                <Text color="#D02C23">Erro ao carregar perfil</Text>
            </Box>
        )
    }
    return(
        <Box justifyContent="center" alignItems="center" w={"100%"} >
          <VStack borderWidth={1} w={800} h={400} borderRadius={9} borderColor="#D02C23" py={5} px={8} space="lg">
            <HStack w={210} alignItems="flex-end" justifyContent="space-between" p={5}>
                <Box style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden' }}>
                {profile?.avatar ? (
                    <Image
                        src={`http://localhost:8000/${profile.avatar}`}
                        alt="Avatar"
                        width={100}
                        height={100}
                        objectFit="cover"
                    />
                    ) : (
                    <Image
                        src={Default}
                        alt="Default Avatar"
                        width={100}
                        height={100}
                        objectFit="cover"
                    />
                )}
                </Box>
                <Text color="#D02C23" fontWeight="bold">
                    {profile?.user.username}
                </Text>
            </HStack>
            <VStack p={5} gap={40} space="md">
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Nome: </Text>
                    {profile?.user.first_name}
                </Text>
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Sobrenome: </Text>
                    {profile?.user.last_name}
                </Text>
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Username: </Text>
                    {profile?.user.username}
                </Text>
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Email: </Text>
                    {profile?.user.email}
                </Text>
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Telefone: </Text>
                    {applyPhoneMask(profile?.phone)}
                </Text>
                <Text color="#D02C23">
                    <Text color="#D02C23" fontWeight="bold">Data de Nascimento: </Text>
                    {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'dd-MM-yyyy') : 'Data não disponível'}
                </Text>  
            </VStack>
            <HStack justifyContent="flex-end">
                <Button
                    onPress={() => setIsOpen(true)}
                    bg="#D02C23"
                    w={70}
                    h={30}
                    sx={{
                        ":hover": {
                          bg: "$red700",
                        },
                        ":active": {
                          bg: "$red800",
                        },
                      }}
                >
                    <ButtonText color="#white">Editar</ButtonText>
                </Button>
            </HStack>
            <ModalProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </VStack>
        </Box>
    )
}