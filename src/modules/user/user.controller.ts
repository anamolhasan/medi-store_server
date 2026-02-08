import { NextFunction, Request, Response } from "express"
import { userService } from "./user.service"


const getCurrentUser = async (
    req:Request,
    res:Response,
    next:NextFunction,
) => {
    try {
        const result = await userService.getCurrentUser(req)
        res.status(200).json({
            success: true,
            message:'Current user fetched successfully!',
            data:result
        })
    } catch (error:any) {
        next(error)
    }
}

const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
   try {
     const result = await userService.getAllUsers();
     res.status(200).json({
        success:true,
        message:'All users fetched successfully!',
        data:result
     })
   } catch (error: any) {
     next(error)
   }
}

const adminStatus = async (req:Request, res:Response, next:NextFunction) => {
     try {
        const result = await userService.adminStatus()
        res.status(200).json({
            success:true,
            message:'Admin stats fetched successfully!',
            data:result,
        })
     } catch (error:any) {
        next(error)
     }
}

const sellerStatus = async () => {

}

const customerStatus = async () => {

}

const updateUser = async () => {

}

export const userController = {
    getCurrentUser,
    getAllUsers,
    adminStatus,
    sellerStatus,
    customerStatus,
    updateUser,
}