import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../../controllers/Category/categoryController";
import { checkAuth } from "../../middlewares/verifyToken";

const router = require('express').Router();

router.route('/categories')
    .get(getAllCategories)
    .post(checkAuth, createCategory)

router.route('/categories/:id')
    .get(getCategory)
    .patch(checkAuth, updateCategory)
    .delete(checkAuth, deleteCategory)

export default router