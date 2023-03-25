import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | { message: string; }
  | IProduct[]
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    case 'PUT':
      return updateProduct(req, res);

    case 'POST':
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();
  const products = await Product.find()
    .sort({ title: 'asc' })
    .lean();
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

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id))
    return res.status(400).json({ message: 'Id de producto no es valido.' });

  if (images.length < 2)
    return res.status(400).json({ message: 'Es necesario al menos 2 imagenes.' });


  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: 'Id de producto no es valido.' });
    }

    // Eliminar la imagen de la CDN
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const fileName = image.substring(image.lastIndexOf('/') + 1).split('.')[0];
        await cloudinary.uploader.destroy(fileName);
      }
    });

    await product.updateOne(req.body, { new: true });

    await db.disconnect();
    return res.status(200).json(product);

  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { images = [] } = req.body as IProduct;

  if (images.length < 2)
    return res.status(400).json({ message: 'Es necesario al menos 2 imagenes.' });

  try {
    await db.connect();
    const productInDb = await Product.findOne({ slug: req.body.slug });

    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({ message: 'Ya existe un producto con el mismo slug.' });
    }

    const product = new Product(req.body);
    await product.save();

    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(500).json({ message: 'Error al crear producto.' });
  }
};