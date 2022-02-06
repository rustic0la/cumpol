import React, { memo } from 'react';
import { FC } from 'react';

import Content from './Content';
import Header from './Header';
import { TopicInnerProps } from './interfaces';

const TopicInner: FC<TopicInnerProps> = memo(({ spaceId, topicId }) => {
  return (
    <>
      <Header spaceId={spaceId} topicId={topicId} />
      <Content spaceId={spaceId} topicId={topicId} />
    </>
  );
});
TopicInner.displayName = 'TopicInner';
TopicInner.whyDidYouRender = true;

export default TopicInner;
