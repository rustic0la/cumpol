import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useAddCheckListMutation } from '@gql/types';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { FC } from 'react';
import Loading from 'src/components/common/Loading';
interface AddCheckListProps {
  topicId: string;
}

const AddCheckList: FC<AddCheckListProps> = ({ topicId }) => {
  const [addCheckList, { loading }] = useAddCheckListMutation({
    variables: { topicId, title: dayjs().format('MMM D, HH:mm') },
  });

  const handleAddCheckList = useCallback(() => {
    addCheckList();
  }, [addCheckList]);

  return (
    <>
      {loading && <Loading w={80} h="auto" />}
      <Box
        width="220px"
        h={320}
        borderRadius="xl"
        border="6px dashed #70ccd6"
        bg="none"
        color="#70ccd6"
        m="0 20px"
      >
        <Flex justifyContent="center" align="center" h="100%">
          <Button leftIcon={<AddIcon />} onClick={handleAddCheckList}>
            Add checkList
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default AddCheckList;
