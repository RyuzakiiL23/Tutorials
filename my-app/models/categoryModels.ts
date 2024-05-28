import mongoose, { Document, Model, Schema } from "mongoose";
import { IStore, IStoreDocument } from "./storeModels";
import { IProduct, IProductDocument } from "./productModels";

export interface ICategory {
  name: string;
  store: mongoose.Types.ObjectId | IStoreDocument["_id"];
  image: string;
  products: mongoose.Types.ObjectId | IProductDocument["_id"][];
}

export interface ICategoryDocument extends ICategory, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    image: {
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategoryDocument> =
  mongoose.models?.Category || mongoose.model<ICategoryDocument>("Category", categorySchema);

export { Category };