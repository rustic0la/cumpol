import { Box } from '@chakra-ui/react';
import React, { FC, memo, RefObject, useEffect, useRef, useState } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import CheckListInner from './Inner';
import { CheckListWrapperProps } from './interfaces';

const CheckListWrapper: FC<CheckListWrapperProps> = memo((props) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  // prevent from dissappearing while scrolling
  const [isVisibleState, setIsVisibleState] = useState<boolean | undefined>();
  useEffect(() => {
    if (isVisible) {
      setIsVisibleState(isVisible);
    }
  }, [isVisible]);

  return (
    <Box ref={ref} w={80} h={400} bg="pink" m="0 10px" borderRadius="xl">
      {isVisibleState && <CheckListInner {...props} />}
    </Box>
  );
});

CheckListWrapper.displayName = 'CheckListWrapper';
CheckListWrapper.whyDidYouRender = true;

export default CheckListWrapper;
