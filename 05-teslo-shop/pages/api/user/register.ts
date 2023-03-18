import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data =
  | { message: string; }
  | { token: string; user: { email: string; role: string; name: string; }; };


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name = '', email = '', password = '' } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  if (password.length < 6)
    return res.status(400).json({ message: 'La contra debe ser mas de 6 caracteres.' });

  if (name.length < 3)
    return res.status(400).json({ message: 'El name es muy corto.' });

  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: 'No es un email valido.' });

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'Bad Request - 1' });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Fallo el registro.' });
  }

  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      name,
      role,
    }
  });
};
