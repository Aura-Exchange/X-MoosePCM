import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  FormatCurrency,
  FormatCrypto,
} from '../primitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import {
  useEffect,
  useState,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  FC,
  useMemo,
} from 'react'

import { useDebounce } from 'usehooks-ts'
import { useMediaQuery } from 'react-responsive'

import Link from 'next/link'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { SearchCollection } from 'pages/api/globalSearch'
import { formatNumber } from 'utils/numbers'
import { useTheme } from 'next-themes'
import Img from 'components/primitives/Img'

type Props = {
  collection: SearchCollection
  handleSelectResult: (result: SearchCollection) => void
}

const CollectionItem: FC<Props> = ({ collection, handleSelectResult }) => {
  const { theme } = useTheme()

  const tokenCount = useMemo(
    () => formatNumber(collection.tokenCount),
    [collection.tokenCount]
  )

  return (
   <>
    <Link
      href={`/collection/${collection.chainName}/${collection.collectionId}`}
      style={{ overflow: 'hidden', width: '100%', minWidth: 0 }}
    >
      <Flex
        css={{
          p: '$2',
          gap: '$3',
          cursor: 'pointer',
          '&:hover': {
            background: '$gray4',
          },
          minWidth: 0,
          width: '100%',
        }}
        align="center"
      >
        <Img
          src={collection.image!}
          style={{ width: 36, height: 36, borderRadius: 4 }}
          width={36}
          height={36}
          alt="Searchbar Collection Image"
        />
        <Flex direction="column" css={{ minWidth: 0 }}>
          <Flex align="center" css={{ gap: '$1' }}>
            <Text style="subtitle1" ellipsify>
              {collection.name}
            </Text>
            <OpenSeaVerified
              openseaVerificationStatus={collection?.openseaVerificationStatus}
            />
          </Flex>
          <Flex align="center" css={{ gap: '$1' }}>
            <Box css={{ height: 12, minWidth: 'max-content' }}>
              <img
                src={
                  theme === 'dark'
                    ? collection.darkChainIcon
                    : collection.lightChainIcon
                }
                style={{ height: 12 }}
              />
            </Box>
            {tokenCount && (
              <Text style="subtitle3" color="subtle">
                {tokenCount} items
              </Text>
            )}
          </Flex>
        </Flex>
        {collection.volumeCurrencySymbol && (
          <Flex css={{ ml: 'auto', flexShrink: 0, gap: '$1' }}>
            <FormatCrypto
              textStyle="subtitle2"
              amount={collection.allTimeVolume}
              decimals={collection.volumeCurrencyDecimals}
              maximumFractionDigits={2}
            />
            {collection.volumeCurrencySymbol}
          </Flex>
        )}
      </Flex>
    </Link>
   </>
  )
}

type SearchResultProps = {
  result: {
    type: 'collection'
    data: any
  }
  handleSelectResult: (result: SearchCollection) => void
}

const SearchResult: FC<SearchResultProps> = ({
  result,
  handleSelectResult,
}) => {
  return (
    <CollectionItem
      collection={result.data}
      handleSelectResult={handleSelectResult}
    />
  )
}

const GlobalSearch = forwardRef<
  ElementRef<typeof Input>,
  ComponentPropsWithoutRef<typeof Input>
>(({ children, ...props }, forwardedRef) => {
  const [searching, setSearching] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [recentResults, setRecentResults] = useState<SearchCollection[]>([])
  const [showSearchBox, setShowSearchBox] = useState(false)

  const hasResults = results.length > 0
  const hasRecentResults = recentResults.length > 0

  const debouncedSearch = useDebounce(search, 500)

  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  useEffect(() => {
    const getSearchResults = async () => {
      setSearching(true)
      let res = await fetch(`/api/globalSearch?query=${process.env.NEXT_PUBLIC_ETH_COLLECTION_SET_ID}`).then(
        (res) => res.json()
      )
      setResults(res.results)
      setSearching(false)
    }
    if (!hasResults) {
      getSearchResults()
    } else {
      setResults([])
    }
  }, [])


  // Add selected collection to recent results
  const handleSelectResult = (selectedResult: SearchCollection) => {
    if (
      !recentResults.find(
        (result) => result.collectionId === selectedResult.collectionId
      )
    ) {
      setRecentResults([selectedResult, ...recentResults.slice(0, 4)])
    }
  }


  return (
    <Box>
      {(hasResults) && (
          <Box
            css={{
              position: 'absolute',
              left: 0,
              right: 0,
              background: '$dropdownBg',
              borderRadius: isMobile ? 0 : 8,
              zIndex: 10,
              border: isMobile ? '' : '1px solid $gray7',
              overflow: 'scroll',
              width: '100%',
              maxHeight: '600%',
            }}
          >
            {results &&
              results
                .map((result) => (
                  <SearchResult
                    result={result}
                    handleSelectResult={handleSelectResult}
                  />
                ))}
          </Box>
        )}
    </Box>
  )
})

export default GlobalSearch
