import mongoose, { Schema, model, Model } from "mongoose";
import { SHOP_CONSTANTS } from "../database";
import { IProduct } from '../interfaces/products';

const productSchema = new Schema({
  description: { type: String, require: true },
  images: [{ type: String }],
  inStock: { type: Number, require: true, default: 0 },
  price: { type: Number, require: true, default: 0 },
  sizes: [{ type: String, enum: { values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], message: '{VALUE} no es un tamano valido' } }],
  slug: { type: String, require: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, require: true },
  type: { type: String, enum: { values: ['shirts', 'pants', 'hoodies', 'hats'], message: '{VALUE} no es un tipo valido' } },
  gender: { type: String, enum: { values: SHOP_CONSTANTS.validGenders, message: '{VALUE} no es un genero valido' } },
}, {
  timestamps: true
});

// ToDo: Crear indice

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;