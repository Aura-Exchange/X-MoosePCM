import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { Text, Box, FormatCryptoCurrency, Grid, Flex } from 'components/primitives'
import { useMounted } from 'hooks'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { formatNumber } from 'utils/numbers'

type Props = {
  label: string
  children: ReactNode
}

const StatBox: FC<Props> = ({ label, children }) => (
  <Box
    css={{
      p: '$4',
      minWidth: 120,
      background: '$panelBg',
    }}
  >
    <Text style="subtitle3" css={{ color: '$gray12' }} as="p">
      {label}
    </Text>
    {children}
  </Box>
)

type StatHeaderProps = {
  collection: NonNullable<ReturnType<typeof useCollections>['data']>['0']
}

const StatHeader: FC<StatHeaderProps> = ({ collection }) => {
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 600 }) && isMounted
  const listedPercentage =
    ((collection?.onSaleCount ? +collection.onSaleCount : 0) /
      (collection?.tokenCount ? +collection.tokenCount : 0)) *
    100

  const saleChangeDecimal = ((collection?.volumeChange?.['1day']))
  const [whole, decimal] = String(saleChangeDecimal).split('.')
  let color;
  let symbol;

  if(!decimal){
    decimal =='0'
  }


  if(whole != '0'){
    color = 'Green'
    symbol = '+'
  }
  else{
    color = ('Red')
    symbol = '-'
  }


  return (
    <Grid
      css={{
        borderRadius: 8,
        overflow: 'hidden',
        gap: 1,
        '@sm': {
          gridTemplateColumns: '1fr 1fr ',
          marginRight: 'auto',
        },
        '@md': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          marginRight: 'auto',
        },
      }}
    >

      <StatBox label="ON SALE">
        <Text style="h5">{formatNumber(collection?.onSaleCount)}/{formatNumber(collection?.tokenCount)}</Text>
      </StatBox>

      <StatBox label="FLOOR">
        <FormatCryptoCurrency
          amount={collection?.floorAsk?.price?.amount?.decimal}
          address={collection?.floorAsk?.price?.currency?.contract}
          decimals={collection?.floorAsk?.price?.currency?.decimals}
          logoHeight={18}
          textStyle={'h5'}
          maximumFractionDigits={2}
        />
      </StatBox>

      <StatBox label="OWNERS">
        <Text style='h5'>{collection.ownerCount}</Text>
      </StatBox>

      <StatBox label=''>

        <Flex direction='column' justify='between'>
          <Flex align='center' justify='start' css={{
            paddingBottom: '$2'
          }}>
            <Text style='subtitle3' css={{paddingRight:'$2'}}>TOTAL VOLUME</Text>
            <FormatCryptoCurrency
              amount={collection.volume?.allTime}
              logoHeight={15}
              textStyle={'subtitle3'}
              maximumFractionDigits={2}
            />
          </Flex>


          <Flex align='center' justify='start'>
            <Text style='subtitle3' css={{paddingRight:'$2'}}>24H SALES</Text>
            <FormatCryptoCurrency
              amount={collection?.volume?.['1day']}
              logoHeight={15}
              textStyle={'subtitle3'}
              maximumFractionDigits={1}
            />

            {/* <FormatCryptoCurrency
              amount={collection?.volumeChange?.['1day']}
              logoHeight={15}
              textStyle={'subtitle3'}
              maximumFractionDigits={0}
            /> */}
            {/* <Text>{collection?.volumeChange?.['1day']}</Text> */}
            <Text style={'subtitle2'} css={{paddingLeft:'$2', color:color}}>  {symbol + (decimal ? decimal.substring(0, 2) + '.' + decimal.substring(2, 3) +'%' : '100%')}</Text>

          </Flex>

        </Flex>
      </StatBox>

    </Grid>
  )
}

export default StatHeader
