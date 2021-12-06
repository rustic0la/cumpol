import React, { SyntheticEvent, useState } from 'react';

import { Wrapper } from '../styles';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log('data', data);
  };

  return (
    <Wrapper>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" disabled={!username || !password} />
      </form>
    </Wrapper>
  );
};
