import React, { useState } from "react";
import { Select } from "native-base";
import { levelOptions } from "../../utils/levelOptions";
import { useGrammars } from "../../utils/api/grammar";

interface IFilterByLevelProps {
    onLevelSelected?: (selectedLevel: string | null) => void;
}

export default function FilterByLevel(props: IFilterByLevelProps) {
    const [selectedLevel, setSelectedLevel] = useState<string>();
    const {
        data: grammars,
        error: grammarsError,
        isLoading: grammarsIsLoading
    } = useGrammars();

    const handleSelectLevel = (level: string) => {
        setSelectedLevel(level)

        const selectedLevel = level === "level" ? null : level

        if (props.onLevelSelected !== undefined) {
            props.onLevelSelected(selectedLevel)
        }
    }

    return (
        <Select
            isDisabled={!grammars || grammarsError !== undefined || grammarsIsLoading}
            size={'md'}
            bg={'white'}
            selectedValue={selectedLevel}
            onValueChange={handleSelectLevel}
            minWidth={200}
            shadow={1}
            accessibilityLabel="Select level"
            placeholder="Select level"
            mt={1}
            w={'200px'}
            _selectedItem={{
                w: "20%"
            }}
        >
            <Select.Item label="Level" value="level" />
            {levelOptions.map((level, index) => (
                <Select.Item label={level.label} value={level.value} key={index} />
            ))}
        </Select>
    )
}