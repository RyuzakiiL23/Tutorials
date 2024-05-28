import mongoose, { Document, Model } from "mongoose";
import { IUser, IUserDocument } from "./userModels";

export interface IStore {
  user: mongoose.Types.ObjectId | IUserDocument["_id"];
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
  storeCity: string;
  storePostCode: string;
  storeBusinessName: string;
  createdBy: mongoose.Types.ObjectId | IUserDocument; // Reference to the user who created the store
}

export interface IStoreDocument extends IStore, Document {
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new mongoose.Schema<IStoreDocument>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },
    storeEmail: {
      type: String,
      required: true,
    },
    storePhone: {
      type: String,
      required: true,
    },
    storeCity: {
      type: String,
      required: true,
    },
    storePostCode: {
      type: String,
      required: true,
    },
    storeBusinessName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store: Model<IStoreDocument> =
  mongoose.models?.Store || mongoose.model("Store", storeSchema);

export { Store };
