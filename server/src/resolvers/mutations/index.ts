import { MutationResolvers } from '../../generated/types';
import addTopic from './addTopic';
import addSpace from './addSpace';
import addTodo from './addTodo';
import addTodoList from './addTodoList';
import deleteTopic from './deleteTopic';
import deleteSpace from './deleteSpace';
import deleteTodo from './deleteTodo';
import deleteTodoList from './deleteTodoList';
import login from './login';
import signup from './signup';
import updateTopic from './updateTopic';
import updateSpace from './updateSpace';
import updateTodo from './updateTodo';
import updateTodoList from './updateTodoList';

const Mutation: MutationResolvers<any, {}> = {
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
  addTodoList: {
    resolve: addTodoList,
  },
  updateTodoList: {
    resolve: updateTodoList,
  },
  deleteTodoList: {
    resolve: deleteTodoList,
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
};

export default Mutation;
