import mongoose, { Document, Schema } from "mongoose";
import { ISubCategory, SubCategory } from "./subCategory";

export interface ICategory extends Document {
    name: String;
    description: String;
    subCategories?: ISubCategory[];
}

const categorySchema: Schema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            min: 1,
        },
        subCategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubCategory'
            },
        ],
    },
    { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);

