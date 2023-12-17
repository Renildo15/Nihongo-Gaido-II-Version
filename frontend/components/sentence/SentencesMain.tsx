import React from "react"
import { Column } from "native-base"
import { useSentences } from "../../utils/api/sentence"
import { useGrammar } from "../../utils/api/grammar"
import GrammarExplain from "./GrammarExplain"
import Error from "../Error"


interface ISentenceMainProps {
    grammarId: number
}

export default function SentenceMain(props: ISentenceMainProps) {
    const {
        data: sentences,
        error: sentencesError,
        isLoading: sentencesIsLoading,
        isValidating: sentencesIsValidating,
        mutate: sentencesMutate
    } = useSentences(props.grammarId)

    const {
        data: grammar,
        error: grammarError,
        isLoading: grammarIsLoading,
        isValidating: grammarIsValidating,
        mutate: grammarMutate
    } = useGrammar(props.grammarId)

    if (sentencesError) return <Error message="Error loading sentences"/>
    if (grammarError) return <Error message="Error loading grammar"/>

    return (
        <Column justifyContent={'center'} alignItems={'center'}>
            <GrammarExplain grammar={grammar}/>
        </Column>
    )
}

