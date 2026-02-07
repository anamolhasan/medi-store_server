import { Request } from "express";
import { Role, UserStatus } from "../../../generated/prisma/enums";


interface UpdateUserPayload {
    name?:string;
    image?:string | null;
    role?:Role;
    status?:UserStatus;
}

const getCurrentUser = async (req:Request) => {
    
}

const getAllUsers = async () => {

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