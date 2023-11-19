import React, { useState } from "react";
import { useProfile, WhoIam } from "../../utils/api/user";
import { Box, Row, Column, Text, Button } from "native-base";
import { applyPhoneMask } from "../../utils/validation";
import Image from "next/image";
import Default from "../../public/images/default.jpg";
import format from "date-fns/format";
import ModalProfile from "./ModalProfile";
import ProfileSkeleton from "./ProfileSkeleton";
import Error from '../Error'

export default function ProfileInfo() {

    const [modalVisible, setModalVisible] = useState(false);
    const {
        data: userInfo,
        error: userInfoError
    } = WhoIam();

    const {
        data: profile,
        error: profileError,
        isLoading: profileLoading,
        isValidating: profileValidating,
    } = useProfile(userInfo?.id );

    if(profileLoading || profileValidating) {
        return (
            <Box justifyContent="center" alignItems="center" w={"100%"} >
                <ProfileSkeleton />
            </Box>
        )
    }

    if(userInfoError || profileError) {
        return (
            <Error message="Error loading profile" />
        )
    }

    return (
        <Box justifyContent={'center'} alignItems={'center'} w={'100%'}>
            <Column 
                justifyContent={'space-around'} 
                w={'600px'} 
                h={'400px'} 
                borderWidth={1} 
                borderRadius={9} 
                borderColor="#D02C23" 
                py={5} 
                px={8} 
                space={'1px'}
                bg={'white'}
            >
                <Row w={210} alignItems="flex-end" justifyContent="space-between" p={5}>
                    <Box borderColor={"#D02C23"} borderWidth={'3px'} style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden' }}>
                        {profile?.avatar 
                            ? (
                                <Image
                                    src={`http://127.0.0.1:8000${profile.avatar}`}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                            )
                        :   (
                                <Image
                                    src={Default}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                            )   
                        }
                    </Box>
                    <Text color="#D02C23" fontWeight="bold">
                        {profile?.user.username}
                    </Text>
                </Row>
                <Column p={5} >
                    <Text color="#D02C23">
                        <Text color="#D02C23" fontWeight="bold">Nome: </Text>
                        {profile?.user.first_name}
                    </Text>
                    <Text color="#D02C23" mt={'4px'}>
                        <Text color="#D02C23" fontWeight="bold">Sobrenome: </Text>
                        {profile?.user.last_name}
                    </Text>
                    <Text color="#D02C23" mt={'4px'}>
                        <Text color="#D02C23" fontWeight="bold">Username: </Text>
                        {profile?.user.username}
                    </Text>
                    <Text color="#D02C23" mt={'4px'}>
                        <Text color="#D02C23" fontWeight="bold">Email: </Text>
                        {profile?.user.email}
                    </Text>
                    <Text color="#D02C23" mt={'4px'}>
                        <Text color="#D02C23" fontWeight="bold">Telefone: </Text>
                        {applyPhoneMask(profile?.phone)}
                    </Text>
                    <Text color="#D02C23" mt={'4px'}>
                        <Text color="#D02C23" fontWeight="bold">Data de Nascimento: </Text>
                        {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'dd-MM-yyyy') : 'Data não disponível'}
                    </Text>  
                </Column>
                <Row justifyContent={'flex-end'}>
                    <Button
                        bg={'#D02C23'}
                        _hover={{bg: '#ae251e'}}
                        _pressed={{bg: '#ae251e'}}
                        onPress={() => setModalVisible(true)}
                    >
                        Change profile
                    </Button>
                </Row>
                <ModalProfile isOpen={modalVisible} onClose={() => setModalVisible(false)} />
            </Column>
        </Box>
    )
}