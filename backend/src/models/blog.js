import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,  
  },
  blogImage: {
    type: String,
    default: null,  
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const blogModel = mongoose.model("blogs", BlogSchema);

export { blogModel };
