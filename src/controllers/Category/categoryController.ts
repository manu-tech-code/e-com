import { Request, Response } from "express"
import { Category } from "../../models/category"

export const getAllCategories = async (req: Request, res: Response): Promise<Response> => {
    const categories = await Category.find()
    return res.json({success: true, categories})
} 

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(404).json({ success: false, message: "Category not found" })
    
        return res.json({success: true, category})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
} 

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    if (req.query.isAdmin) {
        try {
            const category = await Category.findOne({name: req.body.name})
            if (category) return res.status(404).json({ success: false, message: "Category Exist" })

            await Category.create(req.body)
            return res.json({ success: true, message: "Category created successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" })
        }   
    }
    return res.status(401).json({success: false, message: "Unauthorized"})
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
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

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
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