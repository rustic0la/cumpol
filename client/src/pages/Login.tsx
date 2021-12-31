import { useLoginMutation, useSignupMutation } from '@gql/types';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

export const Login: FC = () => {
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const [login] = useLoginMutation({
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      if (login?.token) {
        localStorage.setItem(AUTH_TOKEN, login?.token);
      }
      navigate('/');
    },
  });

  const [signup] = useSignupMutation({
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      if (signup?.token) {
        localStorage.setItem(AUTH_TOKEN, signup?.token);
      }
      navigate('/');
    },
  });

  const submitForm = () => {
    if (formState.login) {
      login();
    } else {
      signup();
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <h4>{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div>
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
            })
          }
          type="text"
          placeholder="Your name"
        />

        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div>
        <button onClick={submitForm}>{formState.login ? 'login' : 'create account'}</button>
        <button
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};
