import mongoose from "mongoose";
import Job from "../models/jobsModel.js";

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    job.postedBy = req.user.userId;
    const validationError = job.validateSync();

    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    // Define default values for sorting, filtering, and pagination
    let sortBy = "createdAt";
    let sortOrder = "desc";
    let searchQuery = {};
    let page = 1;
    let pageSize = 10;

    // Check if query parameters exist and update default values accordingly
    if (req.query.sortBy) {
      sortBy = req.query.sortBy;
    }

    if (req.query.sortOrder) {
      sortOrder = req.query.sortOrder;
    }

    if (req.query.title) {
      // Perform case-insensitive search on the 'title' field
      searchQuery.title = { $regex: new RegExp(req.query.title, "i") };
    }

    if (req.query.status) {
      searchQuery.status = req.query.status;
    }

    if (req.query.location) {
      // Perform case-insensitive search on the 'location' field
      searchQuery.location = { $regex: new RegExp(req.query.location, "i") };
    }

    if (req.query.salary) {
      // Search for jobs with the specified salary or salary range
      const salary = req.query.salary.split("-");
      if (salary.length === 1) {
        // Exact salary match
        searchQuery.salary = salary[0];
      } else if (salary.length === 2) {
        // Salary range
        searchQuery.salary = { $gte: salary[0], $lte: salary[1] };
      }
    }

    if (req.query.page) {
      page = parseInt(req.query.page, 10);
    }

    if (req.query.pageSize) {
      pageSize = parseInt(req.query.pageSize, 10);
    }

    // Calculate skip value based on pagination parameters
    const skip = (page - 1) * pageSize;

    // Fetch total count of jobs
    const totalCount = await Job.countDocuments(searchQuery);

    // Fetch paginated jobs based on search, sort, and pagination criteria
    const jobs = await Job.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Send total count, page number, page size, and paginated results in the response
    res.json({
      totalCount,
      pageNumber: page,
      pageSize,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the authenticated user is the one who posted the job
    if (job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        error: "Permission denied. You can only update your own jobs.",
      });
    }

    const updatedJobData = { ...req.body, postedBy: req.user.userId };
    const validationError = new Job(updatedJobData).validateSync();

    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the authenticated user is the one who posted the job
    if (job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        error: "Permission denied. You can only delete your own jobs.",
      });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to handle stats request
const getJobStatistics = async () => {
  const totalJobs = await Job.countDocuments();
  const monthlyPostedStats = await Job.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
  const yearlyPostedStats = await Job.aggregate([
    {
      $group: {
        _id: { year: { $year: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
  const statusWiseCounts = await Job.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const averageSalary = await Job.aggregate([
    {
      $group: {
        _id: null,
        averageSalary: { $avg: "$salary" },
      },
    },
  ]);
  const titleWiseCounts = await Job.aggregate([
    {
      $group: {
        _id: "$title",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    totalJobs,
    monthlyPostedStats,
    yearlyPostedStats,
    statusWiseCounts,
    averageSalary: averageSalary[0]?.averageSalary || 0,
    titleWiseCounts,
  };
};

// Controller to handle stats request
const getStats = async (req, res) => {
  try {
    const allStats = await getJobStatistics();

    res.json(allStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createJob, getAllJobs, getJobById, updateJob, deleteJob, getStats };
