import express from "express";
import UserRegister from "../models/userRegistration.js";
import { registerValidation, loginValidation } from "../validation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req, res) => {
  //validation befaore user
  console.log(req.body)
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  //check the user is already in database
  const emailexist = await UserRegister.findOne({ email: req.body.email })
  if (emailexist) return res.status(400).send("email already exist")

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(req.body)
  //new user
  const user = new UserRegister({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: false
  })
  try {
    const insert = await user.save();
    res.status(200).send(insert);
    console.log(req.body)
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  // Validate data before user.
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email is exiting.
  let user = await UserRegister.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email not found');

  // Checking the Password.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  const tokenKey = process.env.JWT_TOKEN_SECRET

  //create token 
  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, tokenKey);
  res.header('auth-token', token).send({ user: user, token: token });
  // res.send('logged in ')
});

router.get("/read", async (req, res) => {
  try {
    const user = req.params
    const users = await UserRegister.find(user);
    res.send(users)
  } catch (e) {
    res.status(400).send(e);
  }
})
router.get("/view/:id", async (req, res) => {
  try {
    const userid = req.params._id
    const user = await UserRegister.findById(userid);
    res.send(user)
  } catch (e) {
    res.status(400).send(e);
  }
})

router.put('/update/:_id', async (req, res) => {
  try {
    //   const userid = 
    const user = await UserRegister.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    })
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
    console.log(res.status(400).send(e));
  }
})

router.delete('/delete/:_id', async (req, res) => {
  try {
    const users = await UserRegister.findByIdAndDelete({_id:req.params._id})
    res.status(201).send({ message: "deleted!!" });
  } catch (e) {
    res.status(400).send(e);
  }
})
export default router;