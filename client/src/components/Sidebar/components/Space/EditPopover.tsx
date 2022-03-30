import { EditIcon } from '@chakra-ui/icons';
import {
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { SpaceFragment } from '@gql/types';
import React, { FC, useRef } from 'react';

import { usePopoverHandlers } from '../../hooks/usePopoverHandlers';

interface PopoverProps {
  space: SpaceFragment;
  value: string;
  setInputValue: (value: string) => void;
}

const EditPopover: FC<PopoverProps> = ({ space, value, setInputValue }) => {
  const initialFocusRef = useRef(null);

  const { handleClickEdit, shouldRenderPortal, handleChange, applyChange } = usePopoverHandlers({
    space,
    inputValue: value,
    setInputValue,
  });

  return (
    <Popover initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <EditIcon
          onClick={(e) => handleClickEdit(e)}
          color="gray.500"
          _hover={{ color: 'black' }}
        />
      </PopoverTrigger>
      {shouldRenderPortal && (
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Input
                ref={initialFocusRef}
                onChange={handleChange}
                onBlur={applyChange}
                size="xs"
                value={value}
              />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  );
};

export default EditPopover;
