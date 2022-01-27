import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CheckList: ResolverTypeWrapper<CheckList>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  Payload: ResolverTypeWrapper<Payload>;
  Query: ResolverTypeWrapper<{}>;
  Space: ResolverTypeWrapper<Space>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Todo: ResolverTypeWrapper<Todo>;
  Topic: ResolverTypeWrapper<Topic>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  CheckList: CheckList;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Meta: Meta;
  Mutation: {};
  Payload: Payload;
  Query: {};
  Space: Space;
  String: Scalars['String'];
  Subscription: {};
  Todo: Todo;
  Topic: Topic;
  User: User;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckListResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckList'] = ResolversParentTypes['CheckList']> = {
  complPercent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favicon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hostname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCheckList?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationAddCheckListArgs, 'title' | 'topicId'>>;
  addSpace?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationAddSpaceArgs, 'title'>>;
  addTodo?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationAddTodoArgs, 'checkListId' | 'title'>>;
  addTopic?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationAddTopicArgs, 'spaceId' | 'title'>>;
  deleteCheckList?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationDeleteCheckListArgs, 'checkListId' | 'topicId'>>;
  deleteSpace?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationDeleteSpaceArgs, 'spaceId'>>;
  deleteTodo?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'checkListId' | 'todoId'>>;
  deleteTopic?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationDeleteTopicArgs, 'spaceId' | 'topicId'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'password' | 'username'>>;
  updateCheckList?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationUpdateCheckListArgs, 'checkListId' | 'title' | 'topicId'>>;
  updateSpace?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationUpdateSpaceArgs, 'spaceId' | 'title'>>;
  updateTodo?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'checkListId' | 'title' | 'todoId'>>;
  updateTopic?: Resolver<ResolversTypes['Payload'], ParentType, ContextType, RequireFields<MutationUpdateTopicArgs, 'spaceId' | 'title' | 'topicId'>>;
};

export type PayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payload'] = ResolversParentTypes['Payload']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCheckLists?: Resolver<Array<ResolversTypes['CheckList']>, ParentType, ContextType, RequireFields<QueryGetCheckListsArgs, 'topicId'>>;
  getSpaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  getTodos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryGetTodosArgs, 'checkListId'>>;
  getTopics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<QueryGetTopicsArgs, 'spaceId'>>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  complPercent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  checkListsUpdated?: SubscriptionResolver<Array<ResolversTypes['CheckList']>, "checkListsUpdated", ParentType, ContextType>;
  spacesUpdated?: SubscriptionResolver<Array<ResolversTypes['Space']>, "spacesUpdated", ParentType, ContextType>;
  todosUpdated?: SubscriptionResolver<Array<ResolversTypes['Todo']>, "todosUpdated", ParentType, ContextType>;
  topicsUpdated?: SubscriptionResolver<Array<ResolversTypes['Topic']>, "topicsUpdated", ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  checkListId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isWatched?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['Meta']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  watchedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  complPercent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CheckList?: CheckListResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Payload?: PayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

