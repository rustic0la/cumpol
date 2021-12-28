import { MutationResolvers } from '../../generated/types';
import addCollection from './addCollection';
import addDomain from './addDomain';
import addTodo from './addTodo';
import addTodoList from './addTodoList';
import deleteCollection from './deleteCollection';
import deleteDomain from './deleteDomain';
import login from './login';
import signup from './signup';
import updateCollection from './updateCollection';
import updateDomain from './updateDomain';

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
