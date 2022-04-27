import express from "express";
import Comment from "../models/comment.js";
//import auth from "./verifyToken.js";
const commentRouter = express.Router()

commentRouter.post('./create', async(req, res) => {
    console.log(req.userId);
    console.log(req.courseId);
    const comment = new Comment({
        userId : req.userId._id,
        courseId: req.courseId._id,
        comments: req.body.comments
    });
    try{
        const saveComment = await comment.save();
        const comments = await Comment.findById(saveComment._id).populate("UserRegister","AddCourse");
        res.status(201).send(comments);
    }catch(error){
        res.status(400).send(error)
    }
})

export default commentRouter;