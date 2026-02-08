import { Request } from "express";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


interface UpdateUserPayload {
    name?:string;
    image?:string | null;
    role?:Role;
    status?:UserStatus;
}

const getCurrentUser = async (req:Request) => {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
        where:{id:userId as string},
    })
    return user;
}

const getAllUsers = async () => {
  const result = await prisma.user.findMany()
  return result;
}

const adminStatus = async () => {
    const [
        totalCount,
        customerCount,
        sellerCount,
        adminCount,
        totalCategories,
        totalMedicines,
        totalReviews,
    ] = await prisma.$transaction([
        prisma.user.count(),
        prisma.user.count({where:{role:Role.CUSTOMER}}),
        prisma.user.count({where:{role:Role.SELLER}}),
        prisma.user.count({where:{role:Role.ADMIN}}),
        prisma.category.count(),
        prisma.medicine.count(),
        prisma.review.count(),
    ])

    // Orders: group by status + status + sum totalAmount
    const orderStatus = await prisma.order.groupBy({
        by:["status"],
        _count:{status:true},
        _sum:{totalAmount: true},
    })

    const orderData: any = {
        total:0,
        placed:0,
        processing:0,
        shipped:0,
        delivered:0,
        cancelled:0,
        placedAmount:0,
        processingAmount:0,
        shippedAmount:0,
        deliveredAmount:0,
        cancelledAmount:0,
    }

    let totalOrders = 0;

    for(const s of orderStatus) {
        const status = s.status.toLowerCase();
        orderData[status] = s._count.status;
        orderData[`${status}Amount`] = s._sum.totalAmount || 0;
        totalOrders += s._count.status;
    }

    orderData.total = totalOrders;

    return {
        user:{
                total:totalCount,
                customer:customerCount,
                seller:sellerCount,
                admin:adminCount,
         
        },
        category:{
            total:totalCategories,
        },
        medicine:{
            total:totalMedicines,
        },
        order:orderData,
        review:{
            total:totalReviews,
        }
    }
}

const sellerStatus = async () => {

}

const customerStatus = async () => {

}

const updateUser = async () => {

}

export const userService = {
    getCurrentUser,
    getAllUsers,
    adminStatus,
    sellerStatus,
    updateUser,
    customerStatus,
}