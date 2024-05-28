import mongoose, { Document, Model } from "mongoose";
import { IStoreDocument } from "./storeModels";

export interface IUser {
	username: string;
	fullName: string;
	email: string;
	avatar?: string;
	stores: mongoose.Types.ObjectId[] | IStoreDocument[]; // Reference to the stores created by the user
}

export interface IUserDocument extends IUser, Document {
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
	{
		username: {
			type: String,
			required: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		stores: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Store', // Reference to the Store model
		}],
	},
	{
		timestamps: true,
	}
);

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model("User", userSchema);

export { User };
