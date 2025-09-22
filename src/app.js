import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use("/api/user", userRouter);
export default app;
