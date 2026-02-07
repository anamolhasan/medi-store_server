import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/me",
  auth(Role.CUSTOMER, Role.SELLER, Role.ADMIN),
  userController.getCurrentUser,
);
router.get("/", auth(Role.ADMIN), userController.getAllUsers);
router.get("/admin/status", auth(Role.ADMIN), userController.adminStatus);
router.get("/seller/status", auth(Role.SELLER), userController.sellerStatus);
router.get(
  "/customer/status",
  auth(Role.CUSTOMER),
  userController.customerStatus,
);

router.patch(
  "/:id",
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  userController.updateUser,
);

export const userRoutes = router;
