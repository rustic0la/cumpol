import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CheckList = {
  __typename?: 'CheckList';
  complPercent: Scalars['Int'];
  createdAt: Scalars['Date'];
  dueDate?: Maybe<Scalars['Date']>;
  duration?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  topicId: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  description?: Maybe<Scalars['String']>;
  favicon?: Maybe<Scalars['String']>;
  hostname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  img?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCheckList: Payload;
  addSpace: Payload;
  addTodo: Payload;
  addTopic: Payload;
  deleteCheckList: Payload;
  deleteSpace: Payload;
  deleteTodo: Payload;
  deleteTopic: Payload;
  login: AuthPayload;
  signup: AuthPayload;
  updateCheckList: Payload;
  updateSpace: Payload;
  updateTodo: Payload;
  updateTopic: Payload;
};


export type MutationAddCheckListArgs = {
  title: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationAddSpaceArgs = {
  title: Scalars['String'];
};


export type MutationAddTodoArgs = {
  checkListId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationAddTopicArgs = {
  spaceId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCheckListArgs = {
  checkListId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationDeleteSpaceArgs = {
  spaceId: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  checkListId: Scalars['String'];
  todoId: Scalars['String'];
};


export type MutationDeleteTopicArgs = {
  spaceId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateCheckListArgs = {
  checkListId: Scalars['String'];
  complPercent?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  duration?: InputMaybe<Scalars['Date']>;
  title: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationUpdateSpaceArgs = {
  spaceId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateTodoArgs = {
  checkListId: Scalars['String'];
  complPercent?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  duration?: InputMaybe<Scalars['Date']>;
  isWatched?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  todoId: Scalars['String'];
};


export type MutationUpdateTopicArgs = {
  complPercent?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  duration?: InputMaybe<Scalars['Date']>;
  spaceId: Scalars['String'];
  title: Scalars['String'];
  topicId: Scalars['String'];
};

export type Payload = {
  __typename?: 'Payload';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getCheckLists: Array<CheckList>;
  getSpaces: Array<Space>;
  getTodos: Array<Todo>;
  getTopics: Array<Topic>;
};


export type QueryGetCheckListsArgs = {
  topicId: Scalars['ID'];
};


export type QueryGetTodosArgs = {
  checkListId: Scalars['ID'];
};


export type QueryGetTopicsArgs = {
  spaceId: Scalars['ID'];
};

export type Space = {
  __typename?: 'Space';
  complPercent: Scalars['Int'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  checkListsUpdated: Array<CheckList>;
  spacesUpdated: Array<Space>;
  todosUpdated: Array<Todo>;
  topicsUpdated: Array<Topic>;
};

export type Todo = {
  __typename?: 'Todo';
  checkListId: Scalars['String'];
  createdAt: Scalars['Date'];
  dueDate?: Maybe<Scalars['Date']>;
  duration?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  isWatched: Scalars['Boolean'];
  meta?: Maybe<Meta>;
  title: Scalars['String'];
  watchedAt?: Maybe<Scalars['Date']>;
};

export type Topic = {
  __typename?: 'Topic';
  complPercent: Scalars['Int'];
  createdAt: Scalars['Date'];
  dueDate?: Maybe<Scalars['Date']>;
  duration?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  spaceId: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SpaceFragment = { __typename?: 'Space', id: string, title: string };

export type TopicFragment = { __typename?: 'Topic', id: string, title: string };

export type CheckListFragment = { __typename?: 'CheckList', id: string, title: string };

export type TodoFragment = { __typename?: 'Todo', id: string, title: string, meta?: { __typename?: 'Meta', id: string, url: string, title?: string | null | undefined, description?: string | null | undefined, img?: string | null | undefined, hostname?: string | null | undefined, favicon?: string | null | undefined } | null | undefined };

export type MetaFragment = { __typename?: 'Meta', id: string, url: string, title?: string | null | undefined, description?: string | null | undefined, img?: string | null | undefined, hostname?: string | null | undefined, favicon?: string | null | undefined };

export type AuthPayloadFragment = { __typename?: 'AuthPayload', token?: string | null | undefined, error?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined };

export type PayloadFragment = { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined };

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', token?: string | null | undefined, error?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token?: string | null | undefined, error?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined } };

export type AddSpaceMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddSpaceMutation = { __typename?: 'Mutation', addSpace: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type UpdateSpaceMutationVariables = Exact<{
  spaceId: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdateSpaceMutation = { __typename?: 'Mutation', updateSpace: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type DeleteSpaceMutationVariables = Exact<{
  spaceId: Scalars['String'];
}>;


export type DeleteSpaceMutation = { __typename?: 'Mutation', deleteSpace: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type DeleteTopicMutationVariables = Exact<{
  spaceId: Scalars['String'];
  topicId: Scalars['String'];
}>;


export type DeleteTopicMutation = { __typename?: 'Mutation', deleteTopic: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type UpdateTopicMutationVariables = Exact<{
  spaceId: Scalars['String'];
  topicId: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdateTopicMutation = { __typename?: 'Mutation', updateTopic: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type AddTopicMutationVariables = Exact<{
  title: Scalars['String'];
  spaceId: Scalars['String'];
}>;


export type AddTopicMutation = { __typename?: 'Mutation', addTopic: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type AddCheckListMutationVariables = Exact<{
  title: Scalars['String'];
  topicId: Scalars['String'];
}>;


export type AddCheckListMutation = { __typename?: 'Mutation', addCheckList: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type UpdateCheckListMutationVariables = Exact<{
  topicId: Scalars['String'];
  title: Scalars['String'];
  checkListId: Scalars['String'];
}>;


export type UpdateCheckListMutation = { __typename?: 'Mutation', updateCheckList: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type DeleteCheckListMutationVariables = Exact<{
  topicId: Scalars['String'];
  checkListId: Scalars['String'];
}>;


export type DeleteCheckListMutation = { __typename?: 'Mutation', deleteCheckList: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type AddTodoMutationVariables = Exact<{
  title: Scalars['String'];
  checkListId: Scalars['String'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type UpdateTodoMutationVariables = Exact<{
  checkListId: Scalars['String'];
  title: Scalars['String'];
  todoId: Scalars['String'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type DeleteTodoMutationVariables = Exact<{
  checkListId: Scalars['String'];
  todoId: Scalars['String'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename?: 'Payload', success?: boolean | null | undefined, error?: string | null | undefined } };

export type GetSpacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpacesQuery = { __typename?: 'Query', getSpaces: Array<{ __typename?: 'Space', id: string, title: string }> };

export type GetTopicsQueryVariables = Exact<{
  spaceId: Scalars['ID'];
}>;


export type GetTopicsQuery = { __typename?: 'Query', getTopics: Array<{ __typename?: 'Topic', id: string, title: string }> };

export type GetCheckListsQueryVariables = Exact<{
  topicId: Scalars['ID'];
}>;


export type GetCheckListsQuery = { __typename?: 'Query', getCheckLists: Array<{ __typename?: 'CheckList', id: string, title: string }> };

export type GetTodosQueryVariables = Exact<{
  checkListId: Scalars['ID'];
}>;


export type GetTodosQuery = { __typename?: 'Query', getTodos: Array<{ __typename?: 'Todo', id: string, title: string, meta?: { __typename?: 'Meta', id: string, url: string, title?: string | null | undefined, description?: string | null | undefined, img?: string | null | undefined, hostname?: string | null | undefined, favicon?: string | null | undefined } | null | undefined }> };

export type SpacesUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SpacesUpdatedSubscription = { __typename?: 'Subscription', spacesUpdated: Array<{ __typename?: 'Space', id: string, title: string }> };

export type TopicsUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TopicsUpdatedSubscription = { __typename?: 'Subscription', topicsUpdated: Array<{ __typename?: 'Topic', id: string, title: string }> };

export type CheckListsUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CheckListsUpdatedSubscription = { __typename?: 'Subscription', checkListsUpdated: Array<{ __typename?: 'CheckList', topicId: string, id: string, title: string }> };

export type TodosUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TodosUpdatedSubscription = { __typename?: 'Subscription', todosUpdated: Array<{ __typename?: 'Todo', checkListId: string, id: string, title: string, meta?: { __typename?: 'Meta', id: string, url: string, title?: string | null | undefined, description?: string | null | undefined, img?: string | null | undefined, hostname?: string | null | undefined, favicon?: string | null | undefined } | null | undefined }> };

export const SpaceFragmentDoc = gql`
    fragment space on Space {
  id
  title
}
    `;
export const TopicFragmentDoc = gql`
    fragment topic on Topic {
  id
  title
}
    `;
export const CheckListFragmentDoc = gql`
    fragment checkList on CheckList {
  id
  title
}
    `;
export const MetaFragmentDoc = gql`
    fragment meta on Meta {
  id
  url
  title
  description
  img
  hostname
  favicon
}
    `;
export const TodoFragmentDoc = gql`
    fragment todo on Todo {
  id
  title
  meta {
    ...meta
  }
}
    ${MetaFragmentDoc}`;
export const AuthPayloadFragmentDoc = gql`
    fragment authPayload on AuthPayload {
  token
  error
  user {
    id
    username
  }
}
    `;
export const PayloadFragmentDoc = gql`
    fragment payload on Payload {
  success
  error
}
    `;
export const SignupDocument = gql`
    mutation signup($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    ...authPayload
  }
}
    ${AuthPayloadFragmentDoc}`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...authPayload
  }
}
    ${AuthPayloadFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const AddSpaceDocument = gql`
    mutation addSpace($title: String!) {
  addSpace(title: $title) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type AddSpaceMutationFn = Apollo.MutationFunction<AddSpaceMutation, AddSpaceMutationVariables>;

/**
 * __useAddSpaceMutation__
 *
 * To run a mutation, you first call `useAddSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSpaceMutation, { data, loading, error }] = useAddSpaceMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddSpaceMutation(baseOptions?: Apollo.MutationHookOptions<AddSpaceMutation, AddSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSpaceMutation, AddSpaceMutationVariables>(AddSpaceDocument, options);
      }
export type AddSpaceMutationHookResult = ReturnType<typeof useAddSpaceMutation>;
export type AddSpaceMutationResult = Apollo.MutationResult<AddSpaceMutation>;
export type AddSpaceMutationOptions = Apollo.BaseMutationOptions<AddSpaceMutation, AddSpaceMutationVariables>;
export const UpdateSpaceDocument = gql`
    mutation updateSpace($spaceId: String!, $title: String!) {
  updateSpace(spaceId: $spaceId, title: $title) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type UpdateSpaceMutationFn = Apollo.MutationFunction<UpdateSpaceMutation, UpdateSpaceMutationVariables>;

/**
 * __useUpdateSpaceMutation__
 *
 * To run a mutation, you first call `useUpdateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpaceMutation, { data, loading, error }] = useUpdateSpaceMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpaceMutation, UpdateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpaceMutation, UpdateSpaceMutationVariables>(UpdateSpaceDocument, options);
      }
export type UpdateSpaceMutationHookResult = ReturnType<typeof useUpdateSpaceMutation>;
export type UpdateSpaceMutationResult = Apollo.MutationResult<UpdateSpaceMutation>;
export type UpdateSpaceMutationOptions = Apollo.BaseMutationOptions<UpdateSpaceMutation, UpdateSpaceMutationVariables>;
export const DeleteSpaceDocument = gql`
    mutation deleteSpace($spaceId: String!) {
  deleteSpace(spaceId: $spaceId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type DeleteSpaceMutationFn = Apollo.MutationFunction<DeleteSpaceMutation, DeleteSpaceMutationVariables>;

/**
 * __useDeleteSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useDeleteSpaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSpaceMutation, DeleteSpaceMutationVariables>(DeleteSpaceDocument, options);
      }
export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>;
export type DeleteSpaceMutationResult = Apollo.MutationResult<DeleteSpaceMutation>;
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>;
export const DeleteTopicDocument = gql`
    mutation deleteTopic($spaceId: String!, $topicId: String!) {
  deleteTopic(spaceId: $spaceId, topicId: $topicId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type DeleteTopicMutationFn = Apollo.MutationFunction<DeleteTopicMutation, DeleteTopicMutationVariables>;

/**
 * __useDeleteTopicMutation__
 *
 * To run a mutation, you first call `useDeleteTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTopicMutation, { data, loading, error }] = useDeleteTopicMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useDeleteTopicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTopicMutation, DeleteTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTopicMutation, DeleteTopicMutationVariables>(DeleteTopicDocument, options);
      }
export type DeleteTopicMutationHookResult = ReturnType<typeof useDeleteTopicMutation>;
export type DeleteTopicMutationResult = Apollo.MutationResult<DeleteTopicMutation>;
export type DeleteTopicMutationOptions = Apollo.BaseMutationOptions<DeleteTopicMutation, DeleteTopicMutationVariables>;
export const UpdateTopicDocument = gql`
    mutation updateTopic($spaceId: String!, $topicId: String!, $title: String!) {
  updateTopic(spaceId: $spaceId, topicId: $topicId, title: $title) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type UpdateTopicMutationFn = Apollo.MutationFunction<UpdateTopicMutation, UpdateTopicMutationVariables>;

/**
 * __useUpdateTopicMutation__
 *
 * To run a mutation, you first call `useUpdateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopicMutation, { data, loading, error }] = useUpdateTopicMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      topicId: // value for 'topicId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateTopicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTopicMutation, UpdateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTopicMutation, UpdateTopicMutationVariables>(UpdateTopicDocument, options);
      }
export type UpdateTopicMutationHookResult = ReturnType<typeof useUpdateTopicMutation>;
export type UpdateTopicMutationResult = Apollo.MutationResult<UpdateTopicMutation>;
export type UpdateTopicMutationOptions = Apollo.BaseMutationOptions<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const AddTopicDocument = gql`
    mutation addTopic($title: String!, $spaceId: String!) {
  addTopic(spaceId: $spaceId, title: $title) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type AddTopicMutationFn = Apollo.MutationFunction<AddTopicMutation, AddTopicMutationVariables>;

/**
 * __useAddTopicMutation__
 *
 * To run a mutation, you first call `useAddTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTopicMutation, { data, loading, error }] = useAddTopicMutation({
 *   variables: {
 *      title: // value for 'title'
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useAddTopicMutation(baseOptions?: Apollo.MutationHookOptions<AddTopicMutation, AddTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTopicMutation, AddTopicMutationVariables>(AddTopicDocument, options);
      }
export type AddTopicMutationHookResult = ReturnType<typeof useAddTopicMutation>;
export type AddTopicMutationResult = Apollo.MutationResult<AddTopicMutation>;
export type AddTopicMutationOptions = Apollo.BaseMutationOptions<AddTopicMutation, AddTopicMutationVariables>;
export const AddCheckListDocument = gql`
    mutation addCheckList($title: String!, $topicId: String!) {
  addCheckList(title: $title, topicId: $topicId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type AddCheckListMutationFn = Apollo.MutationFunction<AddCheckListMutation, AddCheckListMutationVariables>;

/**
 * __useAddCheckListMutation__
 *
 * To run a mutation, you first call `useAddCheckListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCheckListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCheckListMutation, { data, loading, error }] = useAddCheckListMutation({
 *   variables: {
 *      title: // value for 'title'
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useAddCheckListMutation(baseOptions?: Apollo.MutationHookOptions<AddCheckListMutation, AddCheckListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCheckListMutation, AddCheckListMutationVariables>(AddCheckListDocument, options);
      }
export type AddCheckListMutationHookResult = ReturnType<typeof useAddCheckListMutation>;
export type AddCheckListMutationResult = Apollo.MutationResult<AddCheckListMutation>;
export type AddCheckListMutationOptions = Apollo.BaseMutationOptions<AddCheckListMutation, AddCheckListMutationVariables>;
export const UpdateCheckListDocument = gql`
    mutation updateCheckList($topicId: String!, $title: String!, $checkListId: String!) {
  updateCheckList(topicId: $topicId, title: $title, checkListId: $checkListId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type UpdateCheckListMutationFn = Apollo.MutationFunction<UpdateCheckListMutation, UpdateCheckListMutationVariables>;

/**
 * __useUpdateCheckListMutation__
 *
 * To run a mutation, you first call `useUpdateCheckListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckListMutation, { data, loading, error }] = useUpdateCheckListMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      title: // value for 'title'
 *      checkListId: // value for 'checkListId'
 *   },
 * });
 */
export function useUpdateCheckListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckListMutation, UpdateCheckListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckListMutation, UpdateCheckListMutationVariables>(UpdateCheckListDocument, options);
      }
export type UpdateCheckListMutationHookResult = ReturnType<typeof useUpdateCheckListMutation>;
export type UpdateCheckListMutationResult = Apollo.MutationResult<UpdateCheckListMutation>;
export type UpdateCheckListMutationOptions = Apollo.BaseMutationOptions<UpdateCheckListMutation, UpdateCheckListMutationVariables>;
export const DeleteCheckListDocument = gql`
    mutation deleteCheckList($topicId: String!, $checkListId: String!) {
  deleteCheckList(topicId: $topicId, checkListId: $checkListId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type DeleteCheckListMutationFn = Apollo.MutationFunction<DeleteCheckListMutation, DeleteCheckListMutationVariables>;

/**
 * __useDeleteCheckListMutation__
 *
 * To run a mutation, you first call `useDeleteCheckListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCheckListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCheckListMutation, { data, loading, error }] = useDeleteCheckListMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *      checkListId: // value for 'checkListId'
 *   },
 * });
 */
export function useDeleteCheckListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCheckListMutation, DeleteCheckListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCheckListMutation, DeleteCheckListMutationVariables>(DeleteCheckListDocument, options);
      }
export type DeleteCheckListMutationHookResult = ReturnType<typeof useDeleteCheckListMutation>;
export type DeleteCheckListMutationResult = Apollo.MutationResult<DeleteCheckListMutation>;
export type DeleteCheckListMutationOptions = Apollo.BaseMutationOptions<DeleteCheckListMutation, DeleteCheckListMutationVariables>;
export const AddTodoDocument = gql`
    mutation addTodo($title: String!, $checkListId: String!) {
  addTodo(title: $title, checkListId: $checkListId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *      checkListId: // value for 'checkListId'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation updateTodo($checkListId: String!, $title: String!, $todoId: String!) {
  updateTodo(checkListId: $checkListId, title: $title, todoId: $todoId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      checkListId: // value for 'checkListId'
 *      title: // value for 'title'
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($checkListId: String!, $todoId: String!) {
  deleteTodo(checkListId: $checkListId, todoId: $todoId) {
    ...payload
  }
}
    ${PayloadFragmentDoc}`;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      checkListId: // value for 'checkListId'
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const GetSpacesDocument = gql`
    query getSpaces {
  getSpaces {
    ...space
  }
}
    ${SpaceFragmentDoc}`;

/**
 * __useGetSpacesQuery__
 *
 * To run a query within a React component, call `useGetSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpacesQuery(baseOptions?: Apollo.QueryHookOptions<GetSpacesQuery, GetSpacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpacesQuery, GetSpacesQueryVariables>(GetSpacesDocument, options);
      }
export function useGetSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpacesQuery, GetSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpacesQuery, GetSpacesQueryVariables>(GetSpacesDocument, options);
        }
export type GetSpacesQueryHookResult = ReturnType<typeof useGetSpacesQuery>;
export type GetSpacesLazyQueryHookResult = ReturnType<typeof useGetSpacesLazyQuery>;
export type GetSpacesQueryResult = Apollo.QueryResult<GetSpacesQuery, GetSpacesQueryVariables>;
export const GetTopicsDocument = gql`
    query getTopics($spaceId: ID!) {
  getTopics(spaceId: $spaceId) {
    ...topic
  }
}
    ${TopicFragmentDoc}`;

/**
 * __useGetTopicsQuery__
 *
 * To run a query within a React component, call `useGetTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useGetTopicsQuery(baseOptions: Apollo.QueryHookOptions<GetTopicsQuery, GetTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicsQuery, GetTopicsQueryVariables>(GetTopicsDocument, options);
      }
export function useGetTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicsQuery, GetTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicsQuery, GetTopicsQueryVariables>(GetTopicsDocument, options);
        }
export type GetTopicsQueryHookResult = ReturnType<typeof useGetTopicsQuery>;
export type GetTopicsLazyQueryHookResult = ReturnType<typeof useGetTopicsLazyQuery>;
export type GetTopicsQueryResult = Apollo.QueryResult<GetTopicsQuery, GetTopicsQueryVariables>;
export const GetCheckListsDocument = gql`
    query getCheckLists($topicId: ID!) {
  getCheckLists(topicId: $topicId) {
    ...checkList
  }
}
    ${CheckListFragmentDoc}`;

/**
 * __useGetCheckListsQuery__
 *
 * To run a query within a React component, call `useGetCheckListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckListsQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetCheckListsQuery(baseOptions: Apollo.QueryHookOptions<GetCheckListsQuery, GetCheckListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckListsQuery, GetCheckListsQueryVariables>(GetCheckListsDocument, options);
      }
export function useGetCheckListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckListsQuery, GetCheckListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckListsQuery, GetCheckListsQueryVariables>(GetCheckListsDocument, options);
        }
export type GetCheckListsQueryHookResult = ReturnType<typeof useGetCheckListsQuery>;
export type GetCheckListsLazyQueryHookResult = ReturnType<typeof useGetCheckListsLazyQuery>;
export type GetCheckListsQueryResult = Apollo.QueryResult<GetCheckListsQuery, GetCheckListsQueryVariables>;
export const GetTodosDocument = gql`
    query getTodos($checkListId: ID!) {
  getTodos(checkListId: $checkListId) {
    ...todo
  }
}
    ${TodoFragmentDoc}`;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *      checkListId: // value for 'checkListId'
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export const SpacesUpdatedDocument = gql`
    subscription spacesUpdated {
  spacesUpdated {
    id
    title
  }
}
    `;

/**
 * __useSpacesUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpacesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpacesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpacesUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSpacesUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SpacesUpdatedSubscription, SpacesUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpacesUpdatedSubscription, SpacesUpdatedSubscriptionVariables>(SpacesUpdatedDocument, options);
      }
export type SpacesUpdatedSubscriptionHookResult = ReturnType<typeof useSpacesUpdatedSubscription>;
export type SpacesUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpacesUpdatedSubscription>;
export const TopicsUpdatedDocument = gql`
    subscription topicsUpdated {
  topicsUpdated {
    ...topic
  }
}
    ${TopicFragmentDoc}`;

/**
 * __useTopicsUpdatedSubscription__
 *
 * To run a query within a React component, call `useTopicsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTopicsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTopicsUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TopicsUpdatedSubscription, TopicsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TopicsUpdatedSubscription, TopicsUpdatedSubscriptionVariables>(TopicsUpdatedDocument, options);
      }
export type TopicsUpdatedSubscriptionHookResult = ReturnType<typeof useTopicsUpdatedSubscription>;
export type TopicsUpdatedSubscriptionResult = Apollo.SubscriptionResult<TopicsUpdatedSubscription>;
export const CheckListsUpdatedDocument = gql`
    subscription checkListsUpdated {
  checkListsUpdated {
    ...checkList
    topicId
  }
}
    ${CheckListFragmentDoc}`;

/**
 * __useCheckListsUpdatedSubscription__
 *
 * To run a query within a React component, call `useCheckListsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCheckListsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckListsUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCheckListsUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CheckListsUpdatedSubscription, CheckListsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CheckListsUpdatedSubscription, CheckListsUpdatedSubscriptionVariables>(CheckListsUpdatedDocument, options);
      }
export type CheckListsUpdatedSubscriptionHookResult = ReturnType<typeof useCheckListsUpdatedSubscription>;
export type CheckListsUpdatedSubscriptionResult = Apollo.SubscriptionResult<CheckListsUpdatedSubscription>;
export const TodosUpdatedDocument = gql`
    subscription todosUpdated {
  todosUpdated {
    ...todo
    checkListId
  }
}
    ${TodoFragmentDoc}`;

/**
 * __useTodosUpdatedSubscription__
 *
 * To run a query within a React component, call `useTodosUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTodosUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTodosUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TodosUpdatedSubscription, TodosUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TodosUpdatedSubscription, TodosUpdatedSubscriptionVariables>(TodosUpdatedDocument, options);
      }
export type TodosUpdatedSubscriptionHookResult = ReturnType<typeof useTodosUpdatedSubscription>;
export type TodosUpdatedSubscriptionResult = Apollo.SubscriptionResult<TodosUpdatedSubscription>;