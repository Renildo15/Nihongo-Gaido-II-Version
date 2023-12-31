import React from "react"
import { GetServerSidePropsContext } from "next"
import { redirectIfNoCredentials } from "../../../../utils"
import { BaseLayout } from "../../../../components/home/BaseLayout"
import { useRouter } from "next/router"
import { useTextWriting } from "../../../../utils/api/text"
import TextWritingDetail from "../../../../components/text/TextWriting/TextWritingDetail"

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return redirectIfNoCredentials({req, res});
}

export default function  WritingDetail() {
    const router = useRouter()
    const textId = parseInt(router.query.textId?.toString() || "")
    const {data: text} = useTextWriting(textId)

    return (
        <BaseLayout title={`${text?.title}`}>
            <TextWritingDetail textId={textId}/>
        </BaseLayout>
    )
}
