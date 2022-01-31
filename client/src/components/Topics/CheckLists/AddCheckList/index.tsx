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
    variables: { topicId, title: dayjs().format('ddd, MMM D, YYYY h:mm A') },
  });

  const handleAddCheckList = useCallback(() => {
    addCheckList();
  }, [addCheckList]);

  return (
    <>
      {loading && <Loading w={80} />}
      <Box
        w={80}
        h={400}
        borderRadius="xl"
        border="6px dashed pink"
        bg="none"
        color="pink"
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
