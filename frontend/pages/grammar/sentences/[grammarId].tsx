import React from "react"
import { GetServerSidePropsContext } from "next"
import { redirectIfNoCredentials } from "../../../utils"
import { BaseLayout } from "../../../components/home/BaseLayout"
import { useRouter } from "next/router"
import SentenceMain from "../../../components/sentence/SentencesMain"
import { Box } from "native-base";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function Sentence() {
    const router = useRouter()
    const grammarId = parseInt(router.query.grammarId?.toString() || "")
    return (
        <BaseLayout title="Sentences">
            <Box
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                flex={2}
            >
                <SentenceMain grammarId={grammarId}/>
            </Box>
        </BaseLayout>
    )
}