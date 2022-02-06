import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAddTodoMutation } from '@gql/types';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { FC } from 'react';

interface AddTodoProps {
  checkListId: string;
}

const AddTodo: FC<AddTodoProps> = ({ checkListId }) => {
  const [addTodo, { loading }] = useAddTodoMutation({
    variables: { checkListId, title: dayjs().format('MMM D, HH:mm') },
  });

  const handleAddTodo = useCallback(() => {
    addTodo();
  }, [addTodo]);

  return (
    <Button
      isLoading={loading}
      leftIcon={<AddIcon />}
      onClick={handleAddTodo}
      variant="ghost"
      _hover={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
      _visited={{ bg: 'none' }}
    >
      Add Todo
    </Button>
  );
};

export default AddTodo;
