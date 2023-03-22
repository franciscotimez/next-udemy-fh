import { db } from '.';
import { IOrder } from '../interfaces';
import { Order } from '../models';
import { isValidObjectId } from 'mongoose';

export const getOrderById = async (id: string): Promise<IOrder | null> => {

  if (!isValidObjectId(id)) return null;

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
};


export const getOrdersByUserId = async (user: string): Promise<IOrder[]> => {

  if (!isValidObjectId(user)) return [];

  await db.connect();
  const orders = await Order.find({ user }).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};

export const setOrderPaided = async (id: string, transactionId: string): Promise<IOrder | null> => {

  console.log({ id }, { transactionId });

  if (!isValidObjectId(id)) return null;

  await db.connect();
  const order = await Order.findById(id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date().getDate().toString();
    order.transactionId = transactionId;
    await order.save();
  }
  await db.disconnect();

  if (!order) return null;

  console.log({ order });

  return JSON.parse(JSON.stringify(order));
};