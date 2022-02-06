import { TodoFragment } from '@gql/types';

export interface TodoProps extends TodoFragment {
  checkListId: string;
}

export type ContentProps = TodoProps;
