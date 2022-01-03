export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'n@KxyFvm3EtVtHNA',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
