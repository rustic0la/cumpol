import { MutationResolvers } from '../../generated/types';
import { Context } from '../../interfaces';
import addCheckList from './addCheckList';
import addMeta from './addMeta';
import addSpace from './addSpace';
import addTodo from './addTodo';
import addTopic from './addTopic';
import deleteCheckList from './deleteCheckList';
import deleteSpace from './deleteSpace';
import deleteTodo from './deleteTodo';
import deleteTopic from './deleteTopic';
import login from './login';
import signup from './signup';
import updateCheckList from './updateCheckList';
import updateSpace from './updateSpace';
import updateTodo from './updateTodo';
import updateTopic from './updateTopic';

const Mutation: MutationResolvers<Context, {}> = {
  addSpace: {
    resolve: addSpace,
  },
  updateSpace: {
    resolve: updateSpace,
  },
  deleteSpace: {
    resolve: deleteSpace,
  },
  addTopic: {
    resolve: addTopic,
  },
  deleteTopic: {
    resolve: deleteTopic,
  },
  updateTopic: {
    resolve: updateTopic,
  },
  addCheckList: {
    resolve: addCheckList,
  },
  updateCheckList: {
    resolve: updateCheckList,
  },
  deleteCheckList: {
    resolve: deleteCheckList,
  },
  addTodo: {
    resolve: addTodo,
  },
  updateTodo: {
    resolve: updateTodo,
  },
  deleteTodo: {
    resolve: deleteTodo,
  },
  signup: {
    resolve: signup,
  },
  login: {
    resolve: login,
  },
  addMeta: {
    resolve: addMeta,
  },
};

export default Mutation;
