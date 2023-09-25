import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from 'bcrypt';

import userRoutes from "./routes/User.js";
import doctorRoutes from "./routes/Doctor.js";
import appointmentRoutes from "./routes/Appointment.js";
import Doctor from "./models/Doctor.js";
import { generateNewUserId } from "./controllers/UserId.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.get("/start-server", (req, res) => {
  res.status(200).json({
    message: "server started",
  });
});
app.use(userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
