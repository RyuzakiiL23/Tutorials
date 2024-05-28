import mongoose, { Document, Model } from "mongoose";

export interface IPost {
	title: string;
	description: string;
}

export interface IPostDocument extends IPost, Document {
	createdAt: Date;
	updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPostDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
    {
    timestamps: true,
    }
)

// export default mongoose.models.Post || mongoose.model('Post', postSchema)

const Post: Model<IPostDocument> = mongoose.models?.Post || mongoose.model("Post", postSchema);

export { Post };