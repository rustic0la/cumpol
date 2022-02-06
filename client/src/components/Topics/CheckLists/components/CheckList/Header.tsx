import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Input, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useCheckListHandlers } from '../../hooks/useCheckListHandlers';
import { HeaderProps } from './interfaces';

const Header: FC<HeaderProps> = ({ checkListId, topicId }) => {
  const {
    handleChange,
    applyChange,
    inputValue,
    handleSelect,
    inputRef,
    deleteLoading,
    handleDeleteClick,
  } = useCheckListHandlers({ checkListId, topicId });

  return (
    <Flex p="10px 15px" align="center">
      <Input
        variant="unstyled"
        onChange={handleChange}
        onBlur={applyChange}
        value={inputValue}
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
