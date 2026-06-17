import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT=async (req,res,next)=>{
    try{
         const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
         
         if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       
        
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
         req.user = user;
         next();
         
    }catch(error){
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default verifyJWT;