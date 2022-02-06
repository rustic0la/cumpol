import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Input, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useTopicHandlers } from '../../hooks/useTopicHandlers';
import { HeaderProps } from './interfaces';

const Header: FC<HeaderProps> = ({ spaceId, topicId }) => {
  const {
    inputValue,
    inputRef,
    handleChange,
    applyChange,
    deleteLoading,
    handleDeleteClick,
    handleSelect,
  } = useTopicHandlers({ spaceId, topicId });

  return (
    <Flex align="center" justify="space-between" pr={5} mb={5}>
      <Input
        variant="flushed"
        onChange={handleChange}
        onBlur={applyChange}
        value={inputValue}
        /*
      // @ts-ignore */
        ref={inputRef}
        onClick={handleSelect}
      />
      {deleteLoading ? (
        <Spinner size="sm" />
      ) : (
        <DeleteIcon
          onClick={handleDeleteClick}
          color="gray.400"
          _hover={{ color: 'gray.600' }}
          cursor="pointer"
        />
      )}
    </Flex>
  );
};

export default Header;
