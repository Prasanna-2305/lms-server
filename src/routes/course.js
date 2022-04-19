import express from "express";
import AddCourse from "../models/adminCourse.js";
import multer from "multer";
const courseRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/')

  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)

  }
})
const upload = multer({ storage: storage });

courseRouter.post("/create", upload.single("image"), async (req, res) => {
  
  try {
    
    
    const link = req.protocol + '://' + req.get('host')
    const imagePath = link + '/' + req.file.originalname;
    
    const user = new AddCourse({
      title: req.body.title,
      content: req.body.content,
      video: req.body.video,
      file: imagePath,
    });
    console.log(req.body);
    console.log(req.file)
    const insert = await user.save();
    res.status(201).send(insert);
  } catch (error) {
    res.status(400).send(error);
  }
});

courseRouter.put('/update/:_id', upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file,"------")
    let imagePath
    console.log("bfre",req.body)
    if(file){
     const  originalname = req.file.originalname 
     const link = req.protocol + '://' + req.get('host')
     imagePath = `${link}/${originalname}`    
    }
    else{
      imagePath = AddCourse.file
    }
    console.log(req.params)
    const user = await AddCourse.findByIdAndUpdate(req.params._id, {
        title: req.body.title,
        content: req.body.content,
        video: req.body.video,
        file: imagePath
    }, {
      new: true
    })
    res.send(user);
    console.log("user",user)
  } catch (e) {
    res.status(400).send(e);
    console.log(res.status(400).send(e));
  }
})

courseRouter.get("/view", async (req, res) => {
  try {
    
    const user = req.params
    const users = await AddCourse.find(user);
    res.send(users)
  } catch (e) {
    res.status(400).send(e);
  }
})
courseRouter.get("/view/:_id", async (req, res) => {
  try {
    const userid = req.params._id
    const user = await AddCourse.findById(userid);
    res.send(user)
  } catch (e) {
    res.status(400).send(e);
  }
})

courseRouter.delete('/delete/:_id', async (req, res) => {
  try {
    const users = await AddCourse.findByIdAndDelete({ _id: req.params._id })
    res.status(201).send({ message: "deleted!!" });
  } catch (e) {
    res.status(400).send(e);
  }
})

export default courseRouter;