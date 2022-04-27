import express from "express";
import '../src/database/connection.js'
import router from "./routes/auth.js";
import courseRouter from "./routes/course.js";
import commentRouter from "./routes/comment.js";
//import likeRouter from "./routes/likeAction.js";
import cors from "cors";
const index = express()
const port = process.env.PORT || 8001;
index.use(express.static('public'))
index.get('/', (req, res) => {
    res.send("Hello world")
})
index.use(express.json())
index.use(cors())
index.use("/users", router)
index.use("/addcourse", courseRouter)
index.use("/commnets", commentRouter)
//index.use("/like", likeRouter)
index.listen(port, function () {
    console.log(`connected port ${port}`);
})

