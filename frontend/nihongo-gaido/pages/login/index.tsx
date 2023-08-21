import React,{useState} from "react"
import { Button, 
        Box, 
        VStack, 
        Center,
        FormControl, 
        Input, 
        Heading, 
        Text,
        InputInput,
        InputIcon,
        Icon,
        ButtonText,
        EyeIcon,
        EyeOffIcon
    } from '@gluestack-ui/themed';
import Image from "next/image";
import Logo from "../../public/logo.png";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
        return !showState
        })
    }
    
    return (
        <Box h={600} borderWidth={1} alignItems="center" justifyContent="center">
            <FormControl>
                <VStack space="xl">
                    <Image
                        src={Logo}
                        alt="Logo Teze"
                        width={150}
                        height={150}
                        priority
                    />
                </VStack>
                <VStack space="xl" w={900} h={400}>
                    <VStack space="xs">
                        <Input>
                            <InputInput type="text" placeholder="Username" color="grey" />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Input>
                            <InputInput type={showPassword ? "text" : "password"} placeholder="Senha" color="grey" />
                            <InputIcon pr="$3" onPress={handleState}>
                        
                            <Icon
                                as={showPassword ? EyeIcon : EyeOffIcon}
                                color="$darkBlue500"
                            />
                            </InputIcon>
                        </Input>
                    </VStack>
                    <Button
                        ml="auto"
                    >
                    <ButtonText color="$white">Login</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </Box>
    )
}