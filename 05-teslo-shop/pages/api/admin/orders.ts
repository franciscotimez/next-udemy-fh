import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, User } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data =
  | { message: string; }
  | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getOrders(req, res);

    // case 'PUT':
    //   return updateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();
  const orders = await Order.find().sort({ updatedAt: 'desc' }).populate('user', 'name email').lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
