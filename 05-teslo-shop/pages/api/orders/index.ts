import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces/order';
import { Order, Product } from '../../../models';

type Data =
  | { message: string; }
  | IOrder;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { orderItems, total } = req.body as IOrder;

  // verificar session
  const session: any = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  // Crear array con los productos
  const productsIds = orderItems.map(product => product._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;

      if (!currentPrice) {
        throw new Error("Verifique su carrito nuevamente - producto no encontrado");
      }

      return (currentPrice * current.quantity) + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backTotal = subTotal * (taxRate + 1);

    if (total !== backTotal) {
      throw new Error("EL total no coincide con el carrito");
    }

    // Hasta ahora bien
    console.log({ session });
    const userId = session.user._id;
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId
    });

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);

  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: 'Contactar con admin.' });
  }
};