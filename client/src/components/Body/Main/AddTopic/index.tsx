import { useAddTopicMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

interface AddTopicButtonProps {
  spaceId: string;
}

const AddTopic: FC<AddTopicButtonProps> = memo(({ spaceId }) => {
  const [addTopic, { loading }] = useAddTopicMutation({
    variables: {
      spaceId,
      title: 'New Topic',
    },
  });

  const handleAddTopicClick = useCallback(() => {
    addTopic();
  }, [addTopic]);

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
