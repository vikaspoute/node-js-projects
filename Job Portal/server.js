// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./config/db.js";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import jobRouter from "./routes/jobRouter.js";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
connectMongoDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
        // url: "https://nodejs-job-portal-app.onrender.com"
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// homeroute root
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/job", jobRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT);
