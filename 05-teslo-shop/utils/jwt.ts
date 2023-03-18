import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {

  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No Hay Semilla JWT!");
  }

  return jwt.sign(
    { _id, email },
    process.env.JWT_SECRET_SEED,
    {
      expiresIn: '30d'
    });
};


export const isValidToken = (token: string): string => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No Hay Semilla JWT!");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_SEED!);

  const { _id } = payload as { _id: string; };
  return _id;
};