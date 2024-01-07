import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirements: {
    type: [String],
    required: [true, "Requirements are required"],
  },
  responsibilities: {
    type: [String],
    required: [true, "Responsibilities are required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
  status: {
    type: String,
    enum: [
      "draft",
      "published",
      "archived",
      "full-time",
      "intern",
      "part-time",
      "contract",
    ],
    default: "draft",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Posted by user is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
