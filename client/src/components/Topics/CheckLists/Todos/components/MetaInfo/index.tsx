import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { MetaFragment } from '@gql/types';
import React, { FC } from 'react';

interface MetaProps {
  meta: MetaFragment;
}

const Meta: FC<MetaProps> = ({ meta }) => {
  const { url, title, favicon, hostname, description } = meta;

  return (
    <Link
      href={url}
      target="_blank"
      _hover={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none', border: 'none' }}
    >
      <Heading fontSize="14px">{title}</Heading>
      <Text
        fontSize="12px"
        overflow="hidden"
        textOverflow="ellipsis"
        display="-webkit-box"
        lineHeight="1.2"
        lineClamp="2"
        mt={1}
        mb={1}
        style={{
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </Text>
      <Flex gap={2}>
        {favicon && <img src={favicon} width="16px" />}
        <Text fontSize="12px">{hostname}</Text>
      </Flex>
    </Link>
  );
};

export default Meta;
