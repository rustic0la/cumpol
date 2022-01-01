import {
  TodoListFragment,
  TopicFragment,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} from '@gql/types';
import React, { BaseSyntheticEvent, memo, useCallback, useState } from 'react';
import { FC } from 'react';
import useCollectionHandlers from 'src/hooks/useCollectionHandlers';

import AddTodoList from './AddTodoList';
import { Border, TopicInnerStyled, TopicStyled } from './styles';
import TodoList from './TodoList';

interface TopicProps {
  topic: TopicFragment;
  onUpdateTopic: (topic?: TopicFragment) => void;
  onDeleteTopic: (id: string) => void;
}

const Topic: FC<TopicProps> = memo(({ topic, onDeleteTopic, onUpdateTopic }) => {
  const { id, title, todoLists } = topic;
  const [inputValue, setInputValue] = useState(() => title);

  const [deleteTopic] = useDeleteTopicMutation();

  const handleDeleteTopicClick = useCallback(
    (e: BaseSyntheticEvent) => {
      const topicId = e.target.id;
      deleteTopic({ variables: { topicId } }).then(() => onDeleteTopic(topicId));
    },
    [deleteTopic, onDeleteTopic],
  );

  const handleChangeTopic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTopic] = useUpdateTopicMutation({
    variables: { topicId: id, title: inputValue },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTopic().then((res) => onUpdateTopic(res.data?.updateTopic));
    }
  }, [inputValue, onUpdateTopic, title, updateTopic]);

  return (
    <TopicStyled>
      {/* TODO: add styles */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type="text" onChange={handleChangeTopic} onBlur={saveChange} value={inputValue} />
        <button id={id} onClick={handleDeleteTopicClick}>
          -
        </button>
      </div>
      <Border />
      <TopicInner topicId={id} todoLists={todoLists} />
    </TopicStyled>
  );
});
Topic.displayName = 'Topic';
Topic.whyDidYouRender = true;

interface TopicInnerProps {
  topicId: string;
  todoLists: TodoListFragment[];
}

const TopicInner: FC<TopicInnerProps> = memo(({ topicId, todoLists }) => {
  const [todoListsState, setTodoListsState] = useState(() => todoLists);

  const { handleUpdate, handleDelete, handleAdd } = useCollectionHandlers({
    // @ts-ignore
    setState: setTodoListsState,
  });

  return (
    <TopicInnerStyled>
      {todoListsState.map((todoList) => (
        <TodoList
          key={todoList?.id}
          todoList={todoList}
          onUpdateTodoList={handleUpdate}
          onDeleteTodoList={handleDelete}
        />
      ))}
      <AddTodoList topicId={topicId} onAddTodoList={handleAdd} />
    </TopicInnerStyled>
  );
});
TopicInner.displayName = 'TopicInner';
TopicInner.whyDidYouRender = true;

export default Topic;
