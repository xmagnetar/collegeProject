import express from 'express';
const app=express();
import cors from 'cors';
import cookieParser from "cookie-parser";

app.use(cookieParser());

app.use(cors({
    origin: [
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "https://minor-project-lime-alpha.vercel.app"
    ],
    credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth",authRoutes);

import mlService from "./routes/predict.routes.js";
app.use("/api/v1/mlService",mlService);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

export default app;