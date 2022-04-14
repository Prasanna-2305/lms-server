import mongoose from "mongoose";
const addCourse = new mongoose.Schema({
    title:{
        type : String,
        trim : true,
        required : true,
    },
    content: {
        type : String,
        trim : true,
        required : true,
    },
    video : {
        type :  String,
        required : true
    },
    file: {
        type :  String,
        required : true
    }
})

const AddCourse = new mongoose.model("AddCourse", addCourse)
export default AddCourse;