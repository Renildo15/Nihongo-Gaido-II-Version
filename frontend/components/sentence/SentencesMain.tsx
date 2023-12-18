import React from "react"
import { Column } from "native-base"
import { useSentences } from "../../utils/api/sentence"
import { useGrammar } from "../../utils/api/grammar"
import GrammarExplain from "./GrammarExplain"
import GrammarExplainSkeleton from "./GrammarExplainSkeleton"
import SentenceSkeleton from "./SentenceSkeleton"
import SentenceList from "./SentenceList"
import Error from "../Error"


interface ISentenceMainProps {
    grammarId: number
}

export default function SentenceMain(props: ISentenceMainProps) {
    const {
        data: sentences,
        error: sentencesError,
        isLoading: sentencesIsLoading,
        mutate: sentencesMutate
    } = useSentences(props.grammarId)

    const {
        data: grammar,
        error: grammarError,
        isLoading: grammarIsLoading,
        mutate: grammarMutate
    } = useGrammar(props.grammarId)

    if (sentencesError) return <Error message="Error loading sentences"/>
    if (grammarError) return <Error message="Error loading grammar"/>
    if (sentencesIsLoading || grammarIsLoading) {
        return (
            <Column justifyContent={'center'} alignItems={'center'} space={'30px'}>
                <GrammarExplainSkeleton/>
                <SentenceSkeleton/>
            </Column>
        )
    }

    return (
        <Column justifyContent={'center'} alignItems={'center'} space={'30px'}>
            <GrammarExplain grammar={grammar}/>
            <SentenceList sentences={sentences}/>
        </Column>
    )
}

