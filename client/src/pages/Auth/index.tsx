import { Button, Flex, Input } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useAuth } from 'src/providers/AuthProvider';

const Auth: FC = () => {
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const { login, signup, loading } = useAuth();

  const submitForm = () => {
    if (formState.login) {
      login?.({ variables: { username: formState.username, password: formState.password } });
    } else {
      signup?.({ variables: { username: formState.username, password: formState.password } });
    }
  };

  return (
    <Flex flexFlow="column" justifyContent="center" align="center" gap={3}>
      <h4>{formState.login ? 'Login' : 'Sign Up'}</h4>
      <Flex flexFlow="column" gap={3}>
        <Input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
            })
          }
          type="text"
          placeholder="Username"
        />

        <Input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Password"
        />
      </Flex>
      <Flex gap={3}>
        <Button isLoading={loading} onClick={submitForm}>
          {formState.login ? 'login' : 'create account'}
        </Button>
        <Button
          variant="link"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Auth;
