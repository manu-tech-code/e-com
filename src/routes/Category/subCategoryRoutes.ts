import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../../controllers/Category/subCategoryController";
import { checkAuth } from "../../middlewares/verifyToken";

const router = require('express').Router();

router.route('/subcategories')
    .get(getAllSubCategories)
    .post(checkAuth, createSubCategory)

router.route('/subcategories/:id')
    .get(getSubCategory)
    .patch(checkAuth, updateSubCategory)
    .delete(checkAuth, deleteSubCategory)

export default router