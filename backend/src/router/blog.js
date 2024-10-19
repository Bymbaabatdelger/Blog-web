import express from "express"
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog } from "../controllers/blog.js";

const blog =express.Router() 

blog.route("/").post(createBlog).get(getAllBlogs)
blog.route("/:id").delete(deleteBlogById);
blog.route("/get-blog/:id").get(getBlogById).put(updateBlog)

export {blog}