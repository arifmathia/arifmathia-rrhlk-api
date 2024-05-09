import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        require:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase: true
    },
    password:{
        type:String,
        require:true
    },
},
{
timestamps:true
});

export const UserModel =mongoose.model("user", UserSchema); 