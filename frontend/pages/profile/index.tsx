import React from "react";
import { Box } from "@gluestack-ui/themed";
import { HomeDefaultPage } from "@/components/home/HomeDefaultPage";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "@/utils";
import ProfileInfo from "@/components/profile/ProfileInfo";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}
  

export default function Profile(){

    return(
        <HomeDefaultPage title="Perfil">
           <Box justifyContent="center" alignItems="center" h={"90.5vh"}>
                <ProfileInfo />
           </Box>
        </HomeDefaultPage>
    )
}