import React from "react";
import { Box, HStack } from "@gluestack-ui/themed";


export function Heading(){
    return(
        <Box
            bg="#D02C23"
            h={"60px"}
            w={"50%"}
            p={9}
            justifyContent="center"
        >
            <HStack>
                <Box>Heading</Box>
            </HStack>
        </Box>
    )
}