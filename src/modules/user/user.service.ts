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