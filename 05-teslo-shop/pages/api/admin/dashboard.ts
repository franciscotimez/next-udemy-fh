import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { DashboardSummaryResponse } from '../../../interfaces';
import { Order, Product, User } from '../../../models';

type Data =
  | { message: string; }
  | DashboardSummaryResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      await db.connect();

      const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
      ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count()
      ]);

      await db.disconnect();
      return res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders
      });

    default:
      return res.status(400).json({ message: 'Bad Reques' });
  }
}