import Blog from '../model/Blog.js';


// Get All Blogs

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return res.status(404).json({ message: "No Blogs Found" })
        }
        return res.status(200).json({ blogs });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// Get a Single Blog

export const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({message: "Blog Not Found"})
        }
        return res.status(200).json({ blog });
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


// Create/Add a Blog

// Create/Add a Blog
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        await blog.save()
        return res.status(200).json({ blog });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




// Update a Blog

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;

    const blogId = req.params.id;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId, req.body);

        if (!blog) {
            return res.status(404).json({message: "Blog Not Found!"})
        }
        return res.status(200).json({ blog })
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


// Delete a Blog

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({message: "The blog you're trying to delete doesn't exist"})
        }
        return res.status(200).json({message: "Blog deleted"})
    } catch {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

