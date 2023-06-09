import FormatCrypto from './FormatCrypto'
import React, { FC, ComponentProps } from 'react'
import { constants } from 'ethers'
import CryptoCurrencyIcon from './CryptoCurrencyIcon'
import Box from './Box'
import Flex from './Flex'

type FormatCryptoCurrencyProps = {
  logoHeight?: number
  address?: string
}

type Props = ComponentProps<typeof FormatCrypto> & FormatCryptoCurrencyProps

const FormatCryptoCurrency: FC<Props> = ({
  amount,
  address = constants.AddressZero,
  maximumFractionDigits,
  logoHeight = 8,
  textStyle,
  css,
  decimals,
}) => {
  return (
    <Flex>

    <FormatCrypto
      css={css}
      textStyle={textStyle}
      amount={amount}
      maximumFractionDigits={maximumFractionDigits}
      decimals={decimals}
    >
      <CryptoCurrencyIcon css={{ height: logoHeight}} address={address} />
    </FormatCrypto>
    </Flex>
    
  )
}

export default FormatCryptoCurrency
