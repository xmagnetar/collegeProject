import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
     userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"email is reqired"],
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:[true,"fullname is reqired"],
        trim:true,
    },
},{timestamps:true});



userSchema.pre("save", async function (next){

    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    
})


userSchema.methods.isPassCorrect= async function (enterdpass){
    return await bcrypt.compare(enterdpass,this.password);
}

userSchema.methods.generateAccessToken=async function(){
    return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY} // access token valid for 15 minutes
  );
}

userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // refresh token valid for 7 days
  );
}



export default mongoose.model("User",userSchema);