import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  
    name : String,
    email: { type: String, required: true, unique: true },
    password: {
     type:String,
     required:true,
    },
    avatarImage : Buffer,
    phoneNumber : Number,
    role:  {
      type : String,
      enum : ["admin" , "user"],
      default:"admin",
    }

})

const userModel = mongoose.model("users" , UserSchema)

export {userModel}