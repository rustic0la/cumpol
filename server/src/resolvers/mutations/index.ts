import { MutationResolvers } from '../../generated/types';
import addCollection from './addCollection';
import addDomain from './addDomain';
import addTodo from './addTodo';
import addTodoList from './addTodoList';
import login from './login';
import signup from './signup';

const Mutation: MutationResolvers<any, {}> = {
  addDomain: {
    resolve: addDomain,
  },
  addCollection: {
    resolve: addCollection,
  },
  addTodoList: {
    resolve: addTodoList,
  },
  addTodo: {
    resolve: addTodo,
  },
  signup: {
    resolve: signup,
  },
  login: {
    resolve: login,
  },
};

export default Mutation;
