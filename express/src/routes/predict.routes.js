import express from "express"
const router=express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import {predictDryEye}  from "../controllers/predict.controller.js";
import { uploadEyeImage } from "../middlewares/upload.middleware.js";


router.post("/predict",verifyJWT, uploadEyeImage.single("file"), predictDryEye);

export default router;