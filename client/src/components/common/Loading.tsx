import { Flex, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

interface LoadingProps {
  w?: string | number;
  h?: string | number;
}

const Loading: FC<LoadingProps> = ({ w, h }) => (
  <Flex justify="center" align="center" h={h || '100%'} w={w}>
    <Spinner />
  </Flex>
);

export default Loading;
