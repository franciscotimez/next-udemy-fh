import { ISize } from "./products";
import { IUser } from "./user";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string,
  // cosas de mongo
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingAddress {
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}