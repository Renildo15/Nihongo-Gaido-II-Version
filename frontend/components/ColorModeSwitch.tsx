import React from "react"

import { IconButton, MoonIcon, SunIcon, Tooltip, useColorMode } from "native-base"

export function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Tooltip
      label={colorMode === "dark" ? "Enable light mode" : "Enable dark mode"}
      placement="bottom right"
      openDelay={300}
      closeOnClick={false}
    >
      <IconButton
        position="absolute"
        top={12}
        right={8}
        onPress={toggleColorMode}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        accessibilityLabel="Color Mode Switch"
      />
    </Tooltip>
  )
}
