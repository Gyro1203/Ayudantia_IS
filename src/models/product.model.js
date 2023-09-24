import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String,
  },
  {
    timestamps: { currentTime: ()=> Date.now() - 3 * 60 * 60 * 1000 },
    versionKey: false,
  }
);

export default model('Product', productSchema); 