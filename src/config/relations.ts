import mongoose, { Model } from 'mongoose';
import { categorySchema } from '../models/category';
import { subCategorySchema } from '../models/subCategory';

let Category;
let SubCategory;

// Register the User and Recipe models with Mongoose
mongoose.model('Category', categorySchema);
mongoose.model('SubCategory', subCategorySchema);

// Category?.hasMany(SubCategory)
// SubCategory?.belongsTo(Category)

// Export the User and Recipe models
export {Category, SubCategory}