const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../schema_model/client_mod')

router.post("/Signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "please  fill out the rquired fields" })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const encryptedpwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      password: encryptedpwd,
    });

    await newUser.save();
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.jwt_Secret, {
      expiresIn: 300,
    });

    res.json({
      message: "Registered successfully",
      name: user.name,
      token
    })
    
  } catch (err) { console.log(err) }
})


router.post("/Signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400)
        .json({ error: "Please fill out email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt_Secret, {
      expiresIn: 3000,
    });
    res.status(200).json({
      message: "Login successful",
      name: user.name,
      token
    })
  } catch (err) {
    console.log({ err: 'failed to sign in' })
  } 
})


module.exports = router;