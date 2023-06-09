import { FC } from 'react'
import { Dropdown, DropdownMenuItem } from 'components/primitives/Dropdown'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Avatar } from 'components/primitives/Avatar'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import {
  Box,
  Button,
  Flex,
  FormatCryptoCurrency,
  Text,
} from 'components/primitives'
import Link from 'next/link'
import { faChevronDown, faCopy, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useENSResolver } from 'hooks'
import CopyText from 'components/common/CopyText'
import GlobalSearch from './navbar/GlobalSearch'

export const CollectionDropdown: FC = () => {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { disconnect } = useDisconnect()
  const {
    name: ensName,
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)

  const trigger = (
    <Button
      css={{
        justifyContent: 'center',
        '@max-width: 600px': { // Adjust the breakpoint as needed
            // Mobile-specific styles here
            // Example: change background color for mobile
            size:'xs'
          },
      }}
      corners='pill'
      type='button'
      color="gray3"
    >
      Change Collection
      <FontAwesomeIcon icon={faChevronDown} width={16} />
    </Button>
  );

  const children = (
    <Box>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <GlobalSearch />
      </DropdownMenuItem>
    </Box>
  );

  return (
    <Dropdown
      trigger={trigger}
      children={children}
      contentProps={{ style: { width: '264px' } }}
    />
  );
};