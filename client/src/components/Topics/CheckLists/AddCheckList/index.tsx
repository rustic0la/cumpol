import { Box, Button, Flex } from '@chakra-ui/react';
import { useAddCheckListMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';
import Loading from 'src/components/common/Loading';
interface AddCheckListProps {
  topicId: string;
}

const AddCheckList: FC<AddCheckListProps> = ({ topicId }) => {
  const [addCheckList, { loading }] = useAddCheckListMutation({
    variables: { topicId, title: 'New CheckList' },
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
          <Button onClick={handleAddCheckList}>Add checkList</Button>
        </Flex>
      </Box>
    </>
  );
};

export default AddCheckList;
