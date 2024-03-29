import React, { Suspense, lazy, memo, useMemo, useState } from "react"

import { Box, Button, Divider, FlatList, Pressable, Row, Spinner, Text } from "native-base"
import { useRouter } from "next/router"
import { MdAdd, MdList } from "react-icons/md"

import { IWordList, useWords } from "../../utils/api/vocabulary"
import DataEmpty from "../DataEmpty"
import Error from "../Error"
import { IVocabularyFilters } from "./SearchVocabulary"

const ModalAddWord = lazy(async () => await import("./ModalAddWord"))
const ModalVocabulary = lazy(async () => await import("./ModalVocabulary"))

interface IWordListProps {
  filters?: IVocabularyFilters
}

export default function WordList(props: IWordListProps) {
  const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
  const [wordId, setWordId] = useState<number | null>(null)
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] = useState(false)
  const router = useRouter()

  const { data: words, error: wordsError, isLoading: wordsIsLoading, isValidating: wordsIsValidating } = useWords()

  const handleChangeWordId = (wordId: number | null) => {
    setWordId(wordId)
    setIsModalVocabularyOpen(true)
  }

  const filteredVocabulary = useMemo(() => {
    if (words === undefined) return []

    const filters = props.filters

    if (filters === undefined) return words

    if (Object.values(filters).every((v) => v === null)) return words

    let filteredWords = words

    if (filters.searchText !== null) {
      filteredWords = filteredWords.filter(
        (word) =>
          word.word.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
          word.reading.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
          word.meaning.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? ""),
      )
    }

    if (filters.category !== null) {
      filteredWords = filteredWords.filter((word) => {
        return word.category !== null && word.category.name === filters.category
      })
    }

    if (filters.level !== null) {
      filteredWords = filteredWords.filter((word) => word.level === filters.level)
    }

    if (filters.type !== null) {
      filteredWords = filteredWords.filter((word) => word.type === filters.type)
    }

    return filteredWords
  }, [words, props.filters])

  if (wordsError) return <Error message={wordsError.message} />

  if (wordsIsLoading || wordsIsValidating) return <Spinner />

  function header() {
    return (
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        mb={5}
        p={"10px"}
      >
        <Text
          fontSize={20}
          fontWeight={700}
        >
          Words({words?.length})
        </Text>
        <Button
          onPress={() => {
            setIsModalAddWordOpen(true)
          }}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          Add
        </Button>
      </Row>
    )
  }

  const RenderItem = memo(({ item }: { item: IWordList }) => {
    return (
      <Pressable
        onPress={() => {
          router.push(`/vocabulary/details/${item.id}`)
        }}
        _hover={{
          bg: "gray.200",
        }}
      >
        <Box
          p={5}
          _light={{ bg: "white" }}
          _dark={{ bg: "gray.700" }}
          rounded={"md"}
          mx={2}
          mb={2}
          w={"220px"}
          shadow={2}
        >
          <Text
            fontSize={20}
            fontWeight={700}
          >
            {item.word} - {item.reading}
          </Text>
          <Divider />
          <Text
            fontSize={15}
            fontWeight={500}
          >
            {item.meaning}
          </Text>
          <Pressable
            onPress={() => {
              handleChangeWordId(item.id)
            }}
          >
            <MdList
              size={24}
              color={"#D02C23"}
            />
          </Pressable>
        </Box>
      </Pressable>
    )
  })

  RenderItem.displayName = "WordItem"

  return (
    <Box
      w={"100%"}
      p={5}
    >
      <FlatList
        w={"100%"}
        data={filteredVocabulary}
        ListHeaderComponent={header}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<DataEmpty message="No words" />}
        ItemSeparatorComponent={() => <Box mt={2} />}
        numColumns={3}
        windowSize={10}
      />
      <Suspense fallback={<Spinner />}>
        <ModalAddWord
          isOpen={isModalAddWordOpen}
          onClose={() => {
            setIsModalAddWordOpen(false)
          }}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ModalVocabulary
          isOpen={isModalVocabularyOpen}
          onClose={() => {
            setIsModalVocabularyOpen(false)
          }}
          wordId={wordId}
        />
      </Suspense>
    </Box>
  )
}
