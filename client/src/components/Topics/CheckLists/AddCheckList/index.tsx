import { useAddCheckListMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';

import { AddCheckListStyled } from './styles';

interface AddCheckListProps {
  topicId: string;
}

const AddCheckList: FC<AddCheckListProps> = ({ topicId }) => {
  const [addCheckList, { loading }] = useAddCheckListMutation({
    variables: { topicId, title: 'New CheckList' },
  });

  const handleAddCheckList = useCallback(() => {
    addCheckList();
  }, [addCheckList]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <AddCheckListStyled onClick={handleAddCheckList}>Add Todo List</AddCheckListStyled>
  );
};

export default AddCheckList;
