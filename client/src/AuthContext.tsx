import { MutationHookOptions } from '@apollo/client';
import {
  LoginMutation,
  LoginMutationVariables,
  Maybe,
  SignupMutation,
  SignupMutationVariables,
  useLoginMutation,
  useSignupMutation,
} from '@gql/types';
import React, { createContext, ReactNode, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { AUTH_TOKEN } from './constants';

interface AuthContextType {
  username: Maybe<string>;
  login?: (args: MutationHookOptions<LoginMutation, LoginMutationVariables>) => void;
  signup?: (args: MutationHookOptions<SignupMutation, SignupMutationVariables>) => void;
  logout?: () => void;
  token: Maybe<string>;
}

const initialValue = {
  username: null,
  token: null,
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [login] = useLoginMutation({
    onCompleted: ({ login }) => {
      if (login) {
        const { token, user } = login;
        if (token) localStorage.setItem(AUTH_TOKEN, token);

        if (user) {
          localStorage.setItem('username', user.username);
          // TODO: fix username edit in url, '/' path redirect
          navigate(`/${user.username}`);
        }
      }
    },
  });

  const [signup] = useSignupMutation({
    onCompleted: ({ signup }) => {
      if (signup) {
        const { token, user } = signup;
        if (token) localStorage.setItem(AUTH_TOKEN, token);

        if (user) {
          localStorage.setItem('username', user.username);
          // TODO: fix username edit in url, '/' path redirect
          navigate(`/${user.username}`);
        }
      }
    },
  });

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem('username');
    navigate('/');
  };

  const token = localStorage.getItem(AUTH_TOKEN);
  const username = localStorage.getItem('username');
  return (
    <AuthContext.Provider value={{ username, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
