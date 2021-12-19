import express from 'express';
import jwt from 'jsonwebtoken';
const APP_SECRET = 'GraphQL-is-aw3some';

export const getTokenPayload = (token: string) => {
  return jwt.verify(token, APP_SECRET);
};

export const getUserId = (req: express.Request, authToken: string) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      // @ts-ignore
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    // @ts-ignore
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
};

export default {
  APP_SECRET,
  getUserId,
};
