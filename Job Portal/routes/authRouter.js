/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to user management
 */

/**
 * @swagger
 * /api/update-user:
 *   put:
 *     summary: Update user details
 *     description: Keep yourself updated! 🔄 Update user details like name, lastName, email, and location.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User details for update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - location
 *     responses:
 *       200:
 *         description: User details updated successfully. 🚀✨
 *       400:
 *         description: Oops! Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Welcome to the community! 🌟 Register a new user with a name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       description: User details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully. 🎉
 *       400:
 *         description: Oops! Bad request. Invalid or missing parameters.
 *       409:
 *         description: Conflict. Email already exists.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in as a user
 *     description: Ready to explore? 🚀 Log in as a user with a valid email and password.
 *     tags: [Users]
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully. 🌟
 *       400:
 *         description: Oops! Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Please provide valid email or password.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

// =============== REQ -> UPDATE ===>
// Update user details
router.put("/update-user", userAuth, updateUserController);

// =============== REQ -> REGISTER ===>
// Register a new user
router.post("/register", registerController);

// =============== REQ -> LOGIN ===>
// Log in as a user
router.post("/login", loginController);

export default router;
