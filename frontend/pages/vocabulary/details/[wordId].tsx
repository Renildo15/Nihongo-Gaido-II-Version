import React from "react"
import { GetServerSidePropsContext } from "next"
import { Box } from "native-base"
import { redirectIfNoCredentials } from "../../../utils"
import { BaseLayout } from "../../../components/home/BaseLayout"
import { useRouter } from "next/router"
import WordDetailsAndExamples from "../../../components/vocabulary/wordDetails/WordDetailsAndExamples"

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function WordDetails() {
    const router = useRouter()
    const wordId = parseInt(router.query.wordId?.toString() || "")
    return (
        <BaseLayout title="Word Details">
            <Box
                w={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <WordDetailsAndExamples wordId={wordId}/>
            </Box>
        </BaseLayout>
    )
}