import express from "express";
import AddCourse from "../models/adminCourse.js";
import multer from "multer";
import auth from "./verifyToken.js";
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

courseRouter.post("/create", auth, upload.single("image"), async (req, res) => {

  try {


    const link = req.protocol + '://' + req.get('host')
    const imagePath = link + '/' + req.file.originalname;

    const course = new AddCourse({
      title: req.body.title,
      content: req.body.content,
      video: req.body.video,
      file: imagePath,
    });
    console.log(req.body);
    console.log(req.file)
    const courses = await course.save();
    res.status(201).send(courses);
  } catch (error) {
    res.status(400).send(error);
  }
});

courseRouter.put('/update/:_id', upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file, "------")
    let imagePath
    console.log("bfre", req.body)
    if (file) {
      const originalname = req.file.originalname
      const link = req.protocol + '://' + req.get('host')
      imagePath = `${link}/${originalname}`
    }
    else {
      imagePath = AddCourse.file
    }
    console.log(req.params)
    const courses = await AddCourse.findByIdAndUpdate(req.params._id, {
      title: req.body.title,
      content: req.body.content,
      video: req.body.video,
      file: imagePath
    }, {
      new: true
    })
    res.send(courses);
    console.log("user", courses)
  } catch (e) {
    res.status(400).send(e);
    console.log(res.status(400).send(e));
  }
})

courseRouter.get("/view", async (req, res) => {
  try {

    const user = req.params
    const courses = await AddCourse.find(user);
    res.send(courses)
  } catch (e) {
    res.status(400).send(e);
  }
})
courseRouter.get("/view/:_id", async (req, res) => {
  try {

    const courses = await AddCourse.findById(req.params._id);
    res.send(courses)
  } catch (e) {
    res.status(400).send(e);
  }
})

courseRouter.delete('/delete/:_id', async (req, res) => {
  try {
    const courses = await AddCourse.findByIdAndDelete({ _id: req.params._id })
    res.status(201).send({ message: "deleted!!" });
  } catch (e) {
    res.status(400).send(e);
  }
})



courseRouter.put("/like/:id", async (req, res) => {
  try {
    const courses = await AddCourse.findById(req.params.id);
    if (courses.likes.includes(req.body.userId)) {
      await courses.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send({})
    }
    else {
      await AddCourse.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.userId } });
      res.status(200).send({});
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
})

courseRouter.put('/comment', auth, async (req, res) => {
  try {
    const comment = {
      text: req.body.texts,
      postedBy: req.body.usersName,
      userInfo: req.body.users_id,
      date: new Date().toDateString(),
    }
    await AddCourse.findByIdAndUpdate(req.body.allCourses_id, {
      $push: { comments: comment }
    }, {
      new: true
    })
      .populate("postedBy", "usersName")
      .populate("userInfo", "users_id")
      .populate("comments.postedBy", "users_id usersName")
      .populate("comments.userInfo", "_id")
    res.status(200).send(comment)
  } catch (err) {
    res.status(400).send(err)
  }
})


export default courseRouter;
