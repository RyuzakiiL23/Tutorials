import mongoose, { Document, Model } from "mongoose";
import { IStoreDocument } from "./storeModels";

export interface IProduct {
  store: mongoose.Types.ObjectId | IStoreDocument["_id"];
  name: string;
  brand: string;
  title: string;
  discount: number;
  condition: string;
  images: string[];
  price: number;
  description: string;
}

export interface IProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProductDocument>(
  {
    store: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    brand: {type: String},
    title: {type: String},
    condition: {type: String},
    discount: {type: Number},
    images: [{ type: String }],
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductDocument> =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

export { Product };
