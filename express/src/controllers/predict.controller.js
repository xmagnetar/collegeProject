import axios from "axios";
import FormData from "form-data";
import dotenv from 'dotenv';
dotenv.config();

export const predictDryEye = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const formData = new FormData();
        
        formData.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const pythonServiceUrl = process.env.PYTHON_BACKEND || "http://localhost:8000/predict";
        //const pythonServiceUrl ="http://localhost:8000/predict";
        const response = await axios.post(pythonServiceUrl, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        return res.status(200).json(response.data);

    } catch (error) {
        console.error("Prediction Controller Error:", error.message);
        return res.status(500).json({ 
            message: "Failed to process image through ML service",
            error: error.message 
        });
    }
};