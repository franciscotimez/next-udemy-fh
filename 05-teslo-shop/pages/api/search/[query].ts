import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';

type Data =
  | { message: string; }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: 'BadRequest' });
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { query = '' } = req.query;

  if (query.length === 0) {
    return res.status(400).json({ message: 'query missing' });
  }

  query = query.toString().toLowerCase();

  db.connect();
  const products = await Product.find({
    $text: { $search: query }
  }).select('title images price inStock slug gender -_id').lean();
  db.disconnect();

  // Arreglo Url de images
  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.NEXTAUTH_URL}/products/${image}`;
    });
    return product;
  });
  return res.status(200).json(updatedProducts);
};
