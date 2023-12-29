import React from "react"
import { GetServerSidePropsContext } from "next"
import { redirectIfNoCredentials } from "../../../../utils"
import { BaseLayout } from "../../../../components/home/BaseLayout"
import { useRouter } from "next/router"
import { useText } from "../../../../utils/api/text"
import TextTranslateDetail from "../../../../components/text/TextTranslate/TextTranslateDetail"

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function TextDetail() {
    const router = useRouter()
    const textId = parseInt(router.query.textId?.toString() || "")
    const {data: text} = useText(textId)

    return (
        <BaseLayout title={`${text?.title}`}>
            <TextTranslateDetail textId={textId}/>
        </BaseLayout>
    )
}
