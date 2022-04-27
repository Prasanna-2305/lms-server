import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"UserRegister",
    },
    courseId:{
        type: Schema.Types.ObjectId,
        ref:"AddCourse"
    },
    comments:{
        type:String,
        trim:true
    }
},{
    timestamps:true
})

const Comment = new mongoose.model("Comment", commentSchema)
export default Comment;