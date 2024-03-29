import React from "react"

import { Column } from "native-base"

import { useGrammar } from "../../utils/api/grammar"
import { useSentences } from "../../utils/api/sentence"
import Error from "../Error"
import GrammarExplain from "./GrammarExplain"
import GrammarExplainSkeleton from "./GrammarExplainSkeleton"
import SentenceList from "./SentenceList"
import SentenceSkeleton from "./SentenceSkeleton"

interface ISentenceMainProps {
  grammarId: number
}

export default function SentenceMain(props: ISentenceMainProps) {
  const { data: sentences, error: sentencesError, isLoading: sentencesIsLoading } = useSentences(props.grammarId)

  const { data: grammar, error: grammarError, isLoading: grammarIsLoading } = useGrammar(props.grammarId)

  if (sentencesError) return <Error message="Error loading sentences" />
  if (grammarError) return <Error message="Error loading grammar" />
  if (sentencesIsLoading || grammarIsLoading) {
    return (
      <Column
        justifyContent={"center"}
        alignItems={"center"}
        space={"30px"}
      >
        <GrammarExplainSkeleton />
        <SentenceSkeleton />
      </Column>
    )
  }

  return (
    <Column
      justifyContent={"center"}
      alignItems={"center"}
      space={"30px"}
      w={"100%"}
    >
      <GrammarExplain grammar={grammar} />
      <SentenceList
        sentences={sentences}
        grammarId={props.grammarId}
      />
    </Column>
  )
}
