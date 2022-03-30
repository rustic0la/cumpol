import { Input } from '@chakra-ui/react';
import React, { FC } from 'react';
import Loading from 'src/components/common/Loading';

import { useTodoHandlers } from '../../hooks/useTodoHandlers';
import Meta from '../MetaInfo';
import { ContentProps } from './interfaces';

const Content: FC<ContentProps> = ({ checkListId, id, title, meta, isWatched }) => {
  const {
    updateLoading,
    addMetaLoading,
    metaState,
    handleSelect,
    handleChangeTodo,
    applyChange,
    inputValue,
    inputRef,
  } = useTodoHandlers({ checkListId, id, title, meta, isWatched });

  return updateLoading || addMetaLoading ? (
    <Loading w="100%" />
  ) : (
    <>
      {metaState ? (
        <Meta meta={metaState} />
      ) : (
        <Input
          fontSize="sm"
          variant="unstyled"
          color="black"
          /*
        // @ts-ignore */
          ref={inputRef}
          onClick={handleSelect}
          onChange={handleChangeTodo}
          onBlur={applyChange}
          value={inputValue}
        />
      )}
    </>
  );
};

export default Content;
