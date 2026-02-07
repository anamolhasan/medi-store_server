import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();


router.get('/me', userController.getCurrentUser)
router.get('/', userController.getAllUsers)
router.get('/admin/stats', userController.adminStatus)
router.get('/seller/status', userController.sellerStatus)
router.get('/customer/status', userController.customerStatus)

router.patch('/:id', userController.updateUser)

export const userRoutes = router