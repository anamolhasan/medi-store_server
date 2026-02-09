import { NextFunction, Request, Response } from "express"
import { reviewService } from "./review.service"


const getAllReviews = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = await reviewService.getAllReviews()
    res.status(200).json({
        success:true,
        message:'All reviews fetched successfully',
        data:result
    })
  } catch (error:any) {
    next(error)
  }
}

const getReviewByUserId = async () => {

}

const createReview = async () => {

}

const deleteReviewById = async () => {

}

const updateReviewById = async () => {

}

export const reviewController = {
    getAllReviews,
    getReviewByUserId,
    createReview,
    deleteReviewById,
    updateReviewById,
}