import { MutationResolvers } from '../../generated/types';
import addCollection from './addCollection';
import addDomain from './addDomain';
import addTodo from './addTodo';
import addTodoList from './addTodoList';
import deleteCollection from './deleteCollection';
import deleteDomain from './deleteDomain';
import deleteTodo from './deleteTodo';
import deleteTodoList from './deleteTodoList';
import login from './login';
import signup from './signup';
import updateCollection from './updateCollection';
import updateDomain from './updateDomain';
import updateTodo from './updateTodo';
import updateTodoList from './updateTodoList';

const Mutation: MutationResolvers<any, {}> = {
  addDomain: {
    resolve: addDomain,
  },
  updateDomain: {
    resolve: updateDomain,
  },
  deleteDomain: {
    resolve: deleteDomain,
  },
  addCollection: {
    resolve: addCollection,
  },
  deleteCollection: {
    resolve: deleteCollection,
  },
  updateCollection: {
    resolve: updateCollection,
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
