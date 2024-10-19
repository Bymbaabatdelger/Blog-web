import mongoose from "mongoose"

 export const connectDatabase = async() => {
    try {
        const MONGODB  = process.env.MONGODB || ""
        await mongoose.connect(MONGODB);
        console.log("Database connected successfully");
        
    } catch {
        console.log(error)
        throw new Error(" Database didn't connect")
    }
 }