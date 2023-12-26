import React from "react"
import { GetServerSidePropsContext } from "next"
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
            <WordDetailsAndExamples wordId={wordId}/>
        </BaseLayout>
    )
}