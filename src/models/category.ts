import mongoose, { Document, Schema, Model } from "mongoose";
import { ISubCategory } from "./subCategory";

export interface ICategory extends Document {
    name: String;
    description: String;
    subcategories?: Schema.Types.ObjectId[];
}
export interface CategoryModel extends Model<ICategory> {
    populateSubcategories(): Promise<ICategory[]>;
}

const categorySchema: Schema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            min: 1,
        },
        subcategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubCategory'
            },
        ],
    },
    { timestamps: true }
);

categorySchema.statics.populateSubcategories = function (): Promise<ICategory[]> {
    return this.find().populate('subcategories').exec() as Promise<ICategory[]>;
};

export const Category = mongoose.model<ICategory, CategoryModel>("Category", categorySchema);

