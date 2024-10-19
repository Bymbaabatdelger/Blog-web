
import { blogModel } from "../models/blog.js";

export const createBlog = async (req, res) => {
  try {
    await blogModel.create(req.body);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const updateBlog = async (req, res) => {
  const blodId = req.params.blodId;
  const updatedBlog = req.body;

  try {
    await blogModel.findByIdAndUpdate(blodId, updatedBlog, { new: true });

    if (updateBlog) {
      return res.status(200).json(updateBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const getAllBlogs = async (req, res) => {
  const { page = 1, limit = 3 } = req.query; 

  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const allblogs = await blogModel
      .find()
      .limit(limitNumber)
      .skip(skip);
    const totalBlogs = await blogModel.countDocuments();

    res.status(200).json({
      data: allblogs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalBlogs / limitNumber),
      totalBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

  
  export const getBlogById = async (req, res) => {
  
    try {
      const blogId = await blogModel.findById(req.params.id);
      if (!blogId) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json(blogId);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const deleteBlogById = async (req, res) => {

    try {
      const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(204).json();
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
