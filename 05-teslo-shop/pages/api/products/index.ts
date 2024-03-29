import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';
import { SHOP_CONSTANTS } from '../../../database/constants';

type Data =
  | { message: string; }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      res.status(400).json({ message: 'BadRequest' });
      break;
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { gender = 'all' } = req.query;

  let condition = {};

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender.toString())) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition).select('title images price inStock slug gender -_id').lean();
  await db.disconnect();

  // Arreglo Url de images
  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.NEXTAUTH_URL}/products/${image}`;
    });
    return product;
  });

  return res.status(200).json(updatedProducts);
};
