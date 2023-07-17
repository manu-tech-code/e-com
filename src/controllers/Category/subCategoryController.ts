import { Request, Response } from "express"
import { Category } from "../../models/category"
import { ISubCategory, SubCategory } from "../../models/subCategory"

export const getAllSubCategories = async (req: Request, res: Response): Promise<Response> => {
    const subCategories: ISubCategory[] = await SubCategory.find().populate('category')
    return res.json({ success: true, subCategories })
}

export const getSubCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const sub_category = await Category.findById(req.params.id)
        if (!sub_category) return res.status(404).json({ success: false, message: "Sub Category not found" })

        return res.json({ success: true, sub_category })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const createSubCategory = async (req: Request, res: Response): Promise<Response> => {
    if (req.query.isAdmin) {
        const category = await Category.findOne({ name: req.body.category })
        if(!category) res.status(404).json({succes: false, message: "Category not found"});
        
        try {
            const sub_ategory = await SubCategory.findOne({ name: req.body.name })
            if (sub_ategory) return res.status(404).json({ success: false, message: "Category Exist" })

            const subcategory = await SubCategory.create({ name: req.body.name, category: category?._id })

            subcategory.category = category?._id;
            await subcategory.save();

            return res.json({ success: true, message: `Sub Category added to Category ${category?.name}`  })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" })
}

export const updateSubCategory = async (req: Request, res: Response): Promise<Response> => {
    if (req.query.isAdmin) {
        try {
            const category = await Category.findByIdAndUpdate(req.params.id, req.body)
            if (!category) return res.status(404).json({ success: false, message: "Category not found" })

            return res.json({ success: true, message: "Category updated successfully" })
        }
        catch (error) {
            return res.status(404).json("Category not found")
        }
    }

    return res.status(401).json({ success: false, message: "Unauthorized" })

}

export const deleteSubCategory = async (req: Request, res: Response): Promise<Response> => {
    if (req.query.isAdmin) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id)
            if (!category) return res.status(404).json({ success: false, message: "Category not found" })

            // category.deleteOne()
            return res.json({ success: true, message: "Category deleted successfully" })
        } catch (error) {
            return res.status(404).json({ success: false, message: "Category not found" })
        }
    }

    return res.status(401).json({ success: false, message: "Unauthorized" })

}