import jwt from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

export const getTokenPayload = (token: string) => jwt.verify(token, APP_SECRET);

export const getUserId = (authHeader: string, authToken: string): string | undefined => {
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token found');
    }
    // @ts-ignore
    const { userId } = getTokenPayload(token);
    return userId;
  }
  if (authToken) {
    // @ts-ignore
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
};
