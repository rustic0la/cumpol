import {
  TodoListFragment,
  TopicFragment,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} from '@gql/types';
import React, { memo, useCallback, useState } from 'react';
import { FC } from 'react';

import AddTodoList from './AddTodoList';
import { Border, TopicInnerStyled, TopicStyled } from './styles';
import TodoList from './TodoList';

interface TopicProps {
  topic: TopicFragment;
  spaceId: string;
}

const Topic: FC<TopicProps> = memo(({ topic, spaceId }) => {
  const { id, title, todoLists } = topic;
  const [inputValue, setInputValue] = useState(() => title);

  const [deleteTopic] = useDeleteTopicMutation({ variables: { topicId: id, spaceId } });

  const handleDeleteTopicClick = useCallback(() => {
    deleteTopic();
  }, [deleteTopic]);

  const handleChangeTopic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTopic] = useUpdateTopicMutation({
    variables: { topicId: id, title: inputValue, spaceId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTopic();
    }
  }, [inputValue, title, updateTopic]);

  return (
    <TopicStyled>
      {/* TODO: add styles */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type="text" onChange={handleChangeTopic} onBlur={saveChange} value={inputValue} />
        <button onClick={handleDeleteTopicClick}>-</button>
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
  return (
    <TopicInnerStyled>
      {todoLists.map((todoList) => (
        <TodoList key={todoList?.id} todoList={todoList} topicId={topicId} />
      ))}
      <AddTodoList topicId={topicId} />
    </TopicInnerStyled>
  );
});
TopicInner.displayName = 'TopicInner';
TopicInner.whyDidYouRender = true;

export default Topic;
