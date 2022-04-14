import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/userRegisterDb", {
    useNewUrlParser: true,
}).then(() => {
    console.log("connected to database");
}).catch(() => {
    console.log("connection failed!!!");
})