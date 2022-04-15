import express from "express";
import '../src/database/connection.js'
import router from "./routes/auth.js";
import courseRouter from "./routes/course.js";
//import adminRoute from "./routes/adminAuth.js";
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
// index.use("/admin", adminRoute)
index.listen(port, function () {
    console.log(`connected port ${port}`);
})

