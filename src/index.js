import dotenv from 'dotenv'
import express from "express";
import '../src/database/connection.js'
import router from "./routes/auth.js";
import courseRouter from "./routes/course.js";
import cors from "cors";
const index = express()
index.use(express.static('public'))
index.get('/', (req, res) => {
    res.send("Hello world")
})
index.use(express.json())
index.use(cors())
index.use("/users", router)
index.use("/addcourse", courseRouter)
dotenv.config()
const port = process.env.PORT || 8001;

if(process.env.NODE_ENV == "production")
{
    index.use(express.static("/client/build"))
}
index.listen(port, function () {
    console.log(`connected port ${port}`);
})

