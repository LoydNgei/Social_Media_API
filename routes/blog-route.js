import express from "express";

import {getAllBlogs, getById, addBlog, updateBlog, deleteBlog} from "../controllers/blog-controller.js";

const blogRouter = express.Router();


blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getById);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);

export default blogRouter;
