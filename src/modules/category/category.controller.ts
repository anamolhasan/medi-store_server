import { NextFunction, Request, Response } from "express"
import { categoryService } from "./category.service";

const getAllCategories = async () => {

}

const createCategory = async (
    req:Request,
    res:Response,
    next:NextFunction,
) => {
    try {
        const {name:category} = req.body;
        if(!category){
            throw new Error('Category is required');
        }
         const result = await categoryService.createCategory(category);
         res.status(201).json({
            success:true,
            message:'Category created successfully',
            data:result
         })
    } catch (error) {
        next(error)
    }
}

const deleteCategoryById = async () => {

}

const updateCategoryById = async () => {

}

export const categoryController = {
    createCategory,
    getAllCategories,
    deleteCategoryById,
    updateCategoryById,
}