import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

// GET USERS || GET

// UPDATE USER || PUT
router.put("/update", userAuth, updateUserController);

export default router;
