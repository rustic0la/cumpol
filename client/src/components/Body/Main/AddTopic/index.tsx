import { TopicFragment, useAddTopicMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

interface AddTopicButtonProps {
  spaceId: string;
  onAddTopic: (topic: TopicFragment) => void;
}

const AddTopic: FC<AddTopicButtonProps> = memo(({ spaceId, onAddTopic }) => {
  const [addTopic, { loading }] = useAddTopicMutation({
    variables: {
      spaceId,
      title: 'New Topic',
    },
  });

  const handleAddTopicClick = useCallback(() => {
    addTopic().then((res) => {
      if (!loading && res.data?.addTopic) {
        onAddTopic(res.data?.addTopic);
      }
    });
  }, [addTopic, loading, onAddTopic]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddTopicClick}>Add Topic</button>
  );
});
AddTopic.displayName = 'AddTopicButton';
AddTopic.whyDidYouRender = true;

export default AddTopic;
