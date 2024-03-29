import React, { useState } from "react"

import { Select } from "native-base"

import { useWords } from "../../utils/api/vocabulary"
import { typeWordsOptions } from "../../utils/options"

interface IFilterByTypeProps {
  onTypeSelected?: (selectedType: string | null) => void
}

export default function FilterByType(props: IFilterByTypeProps) {
  const [selectedType, setSelectedType] = useState<string>()
  const { data: words, error: wordsError, isLoading: wordsIsLoading } = useWords()

  const handleSelectType = (type: string) => {
    setSelectedType(type)

    const selectedType = type === "by type" ? null : type

    if (props.onTypeSelected !== undefined) {
      props.onTypeSelected(selectedType)
    }
  }

  return (
    <Select
      isDisabled={!words || wordsError !== undefined || wordsIsLoading}
      size={"md"}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "#262626",
      }}
      selectedValue={selectedType}
      onValueChange={handleSelectType}
      minWidth={200}
      shadow={1}
      accessibilityLabel="Select type"
      placeholder="Select type"
      mt={1}
      w={"200px"}
      _selectedItem={{
        w: "20%",
      }}
    >
      <Select.Item
        label="By type"
        value="by type"
      />
      {typeWordsOptions.map((type, index) => (
        <Select.Item
          label={type.label}
          value={type.value}
          key={index}
        />
      ))}
    </Select>
  )
}
