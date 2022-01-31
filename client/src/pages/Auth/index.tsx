import { Flex } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useAuth } from 'src/providers/AuthProvider';

const Auth: FC = () => {
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const { login, signup } = useAuth();

  const submitForm = () => {
    if (formState.login) {
      login?.({ variables: { username: formState.username, password: formState.password } });
    } else {
      signup?.({ variables: { username: formState.username, password: formState.password } });
    }
  };

  return (
    <Flex justifyContent="center" align="center">
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
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </Flex>
  );
};

export default Auth;
