import { Box } from '@chakra-ui/react';
import React, { FC, memo, RefObject, useEffect, useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import TopicInner from './Inner';
import { TopicWrapperProps } from './interfaces';

const TopicWrapper: FC<TopicWrapperProps> = memo((props) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  // prevent from dissappearing while scrolling
  const [isVisibleState, setIsVisibleState] = useState<boolean | undefined>();
  useEffect(() => {
    if (isVisible) {
      setIsVisibleState(isVisible);
    }
  }, [isVisible]);

  return <Box ref={ref}>{isVisibleState && <TopicInner {...props} />}</Box>;
});
TopicWrapper.displayName = 'TopicWrapper';
TopicWrapper.whyDidYouRender = true;

export default TopicWrapper;
