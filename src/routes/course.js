import express  from "express";
import AddCourse from "../models/adminCourse.js";
import multer from "multer";
const courseRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, './src/uploads/images')

    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
        
    }
})
const upload = multer({storage: storage});

courseRouter.post("/create", upload.single("image"), async (req, res) => {
    try {
      const user = new AddCourse({
        title: req.body.title,
        content: req.body.content,
        video: req.body.video,
        file: req.file.originalname,
      });
      
      console.log(req.body);
      console.log(req.file)
      const insert = await user.save();
      res.status(201).send(insert);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
  courseRouter.get("/read", async (req, res) => {
    try {
      const user = req.params
      const users = await AddCourse.find(user);
      res.send(users)
    } catch (e) {
      res.status(400).send(e);
    }
  })

export default courseRouter;