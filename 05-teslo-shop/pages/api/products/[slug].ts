import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data =
  | { message: string; }
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      res.status(400).json({ message: 'BadRequest' });
      break;
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  if (!product) return res.status(404).json({ message: 'Product not Found' });
  
  // Arreglo Url de images
  product.images = product.images.map(image => {
    return image.includes('http') ? image : `${process.env.NEXTAUTH_URL}/products/${image}`;
  });
  return res.status(200).json(product);

};
