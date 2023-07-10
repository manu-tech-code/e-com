import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./category";

export interface ISubCategory extends Document {
    name: String;
    description: String;
    category?: ICategory['_id'];
}

export const subCategorySchema: Schema = new Schema<ISubCategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            min: 1,
        },
        category: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            },
        ],
    },
    { timestamps: true }
);

export const SubCategory = mongoose.model<ISubCategory>("SubCategory", subCategorySchema);

