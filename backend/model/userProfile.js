import mongoose from "mongoose";
import validator from "validator";

const userProfileSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phoneNumber:{
        type:Number,
        require:true,
    },
    // photo:{
    //     public_id:{
    //         type:String,
    //         require:true,
    //     },
    //     url:{
    //         type:String,
    //         require:true,
    //     },
    // },
    aboutMe:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female"],
    },
    university:{
        type:String,
        require:true
    },
    degree:{
        type:String,
        require:true,
    },
    from:{
        type:Date,
        default:Date.now
    },
    to:{
        type:Date,
        default:Date.now
    },
    cgpa:{
        type:Number,
        require:true
    }
})

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;