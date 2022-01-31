import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAddTopicMutation } from '@gql/types';
import dayjs from 'dayjs';
import React, { FC, memo, useCallback } from 'react';

interface AddTopicButtonProps {
  spaceId: string;
}

const AddTopic: FC<AddTopicButtonProps> = memo(({ spaceId }) => {
  const [addTopic, { loading }] = useAddTopicMutation({
    variables: {
      spaceId,
      title: dayjs().format('ddd, MMM D, YYYY h:mm A'),
    },
  });

  const handleAddTopicClick = useCallback(() => {
    addTopic();
  }, [addTopic]);

  return (
    <Button leftIcon={<AddIcon />} isLoading={loading} onClick={handleAddTopicClick}>
      Add Topic
    </Button>
  );
});
AddTopic.displayName = 'AddTopicButton';
AddTopic.whyDidYouRender = true;

export default AddTopic;
