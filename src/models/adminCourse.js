import mongoose from "mongoose";
const Schema = mongoose.Schema;
const addCourse = new mongoose.Schema({
    userId:{
       type: String,
       //ref:"UserRegister",
    },
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
    },
    likes: {
        type: Array,
        default: [],
        
    },
  
})

const AddCourse = new mongoose.model("AddCourse", addCourse)
export default AddCourse;