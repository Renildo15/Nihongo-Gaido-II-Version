import { createContext, Dispatch, SetStateAction } from "react";

const defaultValue: {
  menuIsCollapsedState: [boolean, Dispatch<SetStateAction<boolean>>]
} = {
  menuIsCollapsedState: [false, () => {}]
}

export const HomeContext = createContext(defaultValue)