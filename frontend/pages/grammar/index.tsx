import React from "react";
import { Box } from "@gluestack-ui/themed";
import { HomeDefaultPage } from "@/components/home/HomeDefaultPage";
import { GetServerSidePropsContext } from "next";
import { redirectIfNoCredentials } from "@/utils";
import { GrammarList } from "@/components/grammar/GrammarList";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}
  
export default function Grammar() {
    return (
        <HomeDefaultPage title="Gramática">
            <Box justifyContent="center" alignItems="center" h={"90.5vh"}>
                <GrammarList />
            </Box>
        </HomeDefaultPage>
    )
}