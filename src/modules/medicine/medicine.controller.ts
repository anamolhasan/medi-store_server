import { NextFunction, Request, Response } from "express"
import { medicineService } from "./medicine.service";

const createMedicine = async (
    req:Request,
    res:Response,
    next:NextFunction,
) => {

    try {
        const medicineData = req.body;
        const result = await medicineService.createMedicine(medicineData)

        res.status(201).json({
            success:true,
            message:'Medicine created successfully',
            data:result
        })
    } catch (error) {
        next(error)
    }

}

export const medicineController = {
    createMedicine 
}