import { Router } from "express";
import { categoryController } from "./category.controller";
import { Role } from "../../../generated/prisma/enums";
import auth from "../../middleware/auth";


const router = Router()

router.get('/', categoryController.getAllCategories)

router.post(
    '/', 
    auth(Role.ADMIN, Role.SELLER),
    categoryController.createCategory
)

router.delete(
    '/:id',
    auth(Role.ADMIN, Role.SELLER),
    categoryController.deleteCategoryById
)

router.patch(
    '/:id',
    auth(Role.ADMIN, Role.SELLER),
    categoryController.updateCategoryById
)

export const categoryRoutes = router