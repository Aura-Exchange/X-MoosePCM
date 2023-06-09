import { useTokens } from "@reservoir0x/reservoir-kit-ui"
import { Flex } from "./primitives"

const TokenSearch = (collection:any) =>{

    const { data: singleTokens } = useTokens({
        tokens: ["0x7cb90567a118cd9f6ca326067a0813b289bdcb54:3"],
      })
      

    
    return(
        <Flex>
            {singleTokens[0]?.token?.name}
        </Flex>
    )
}

export default TokenSearch