import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/auth.routes.js";
import blockRoutes from "../src/routes/block.routes.js";

app.use(cors({
  origin: ["http://localhost:5173", "https://quiet-hours-scheduler-1.onrender.com"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/auth", authRoutes);
app.use("/block", blockRoutes)

export default app;
