import { Medicine } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/appError";


const createMedicine = async (payload:Medicine) => {
  const {
    name,
    description,
    price,
    stock,
    manufacturer,
    imageUrl,
    categoryId,
    sellerId,
  } = payload;

   // 1️⃣ Validate seller
   const seller = await prisma.user.findUnique({
    where: {id:sellerId}
   })

   if(!seller){
    throw new AppError('Seller not found', 404)
   }
}


export const medicineService = {
    createMedicine 
}