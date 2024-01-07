/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API operations related to job management
 */

/**
 * @swagger
 * /api/create-job:
 *   post:
 *     summary: Create a new job
 *     description: Magic happens here! ✨ Create a new job and let the opportunities unfold.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Job details for creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the job.
 *               company:
 *                 type: string
 *                 description: The name of the hiring company.
 *               location:
 *                 type: string
 *                 description: The location of the job.
 *               description:
 *                 type: string
 *                 description: A brief description of the job.
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of job requirements.
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of job responsibilities.
 *               salary:
 *                 type: number
 *                 description: The offered salary for the job.
 *             required:
 *               - title
 *               - company
 *               - location
 *               - description
 *               - requirements
 *               - responsibilities
 *               - salary
 *     responses:
 *       201:
 *         description: Job created successfully 🚀
 *       400:
 *         description: Oops! Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/get-all:
 *   get:
 *     summary: Get all jobs
 *     description: Explore the world of opportunities! Retrieve a list of all available jobs.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: Field to sort the jobs by. Default is 'createdAt'.
 *         type: string
 *       - in: query
 *         name: sortOrder
 *         description: Sort order. 'asc' for ascending, 'desc' for descending. Default is 'desc'.
 *         type: string
 *       - in: query
 *         name: title
 *         description: Search jobs by title (case-insensitive).
 *         type: string
 *       - in: query
 *         name: status
 *         description: Filter jobs by status.
 *         type: string
 *       - in: query
 *         name: location
 *         description: Search jobs by location (case-insensitive).
 *         type: string
 *       - in: query
 *         name: salary
 *         description: Filter jobs by salary or salary range (e.g., 50000-80000).
 *         type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination. Default is 1.
 *         type: integer
 *       - in: query
 *         name: pageSize
 *         description: Number of items per page. Default is 10.
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful retrieval of job list. 🌐
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/get-job/{id}:
 *   get:
 *     summary: Get a job by ID
 *     description: Dive deep into the details! Retrieve a specific job by its unique identifier.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of job details. 📋
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       404:
 *         description: Job not found. Oops, the job seems to have vanished!
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/update-job/{id}:
 *   put:
 *     summary: Update a job by ID
 *     description: Bring new life to a job! 🔄 Update the details of a job using its unique identifier.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New details for updating the job
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Job updated successfully. 🚀✨
 *       400:
 *         description: Oops! Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       404:
 *         description: Job not found. Oops, the job seems to have vanished!
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     description: Say goodbye to a job! 🗑️ Delete a job using its unique identifier.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Job deleted successfully. 🚮
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       404:
 *         description: Job not found. Oops, the job seems to have vanished!
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get job statistics
 *     description: Dive into the numbers! Retrieve various statistics related to job postings.
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of job statistics. 📊
 *       401:
 *         description: Unauthorized. Hold on, you need to be authenticated.
 *       500:
 *         description: Internal server error. Something went wrong behind the scenes.
 */

import express from "express";
import * as jobController from "../controllers/jobController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// =============== REQ -> CREATE ===>
// Create a new job
router.post("/create-job", userAuth, jobController.createJob);

// =============== REQ -> READ ===>
// Get all jobs
router.get("/get-all", userAuth, jobController.getAllJobs);

// Get a specific job by ID
router.get("/get-job/:id", userAuth, jobController.getJobById);

// =============== REQ -> UPDATE ===>
// Update a job by ID
router.put("/update-job/:id", userAuth, jobController.updateJob);

// =============== REQ -> DELETE ===>
// Delete a job by ID
router.delete("/delete-job/:id", userAuth, jobController.deleteJob);

// =============== REQ -> STATS ===>
// Get job statistics
router.get("/stats", userAuth, jobController.getStats);

export default router;
