import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-route.js";
import blogRouter from "./routes/blog-route.js";

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/blogs", blogRouter);


const port = 5000;

mongoose.connect('mongodb+srv://Loyd:pgm6RRZXBOsHaiXf@cluster0.m8chrbr.mongodb.net/BlogApp?retryWrites=true&w=majority')
    .then (() => { console.log("Database connected successfully") })
    .catch ((err) => { console.error(err) })



// pgm6RRZXBOsHaiXf

app.listen(port, () => {
    console.log(`Server running on ${port}...`)
})