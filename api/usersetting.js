const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const authMiddleware = require("../middlewares/authMiddleware");
const Joi = require("joi");
const bcrypt = require('bcryptjs');

// Read
router.get("/userlist", async (req, res) => {
  const fetchTest = await User.find();

  const results = fetchTest.map((content) => {
    return {
      userId: content.userId,
      username: content.username,
      password: content.password,
    };
  });

  res.json({
    data: results,
  });
});

// UPDATE user's username
const usernameSchema = Joi.object({
  username: Joi.string().required()
});

router.patch('/user/username', authMiddleware, async (req, res) => {
  try {
    const { username } = await usernameSchema.validateAsync(req.body);
    const { user } = res.locals;
    const userId = user._id;

    try {
      const existUser = await User.findById(userId).exec();

      existUser.username = username;
      await existUser.save();

      return res.status(200).send({ message: "Username successfully edited." })
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({ message: 'User not found.' });
    }
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Username is required." });
  }
});

// UPDATE user's password
const passwordSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$")).required(),
  confirmPassword: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$")).required()
})

router.patch('/user/password', authMiddleware, async (req, res) => {
  try {
    const pass = await passwordSchema.validateAsync(req.body);
    const { user } = res.locals;
    const userId = user._id;

    if (pass.password !== pass.confirmPassword) {
      return res.status(400).send({ message: "Password must match." })
    }

    const existUser = await User.findById(userId).exec();

    bcrypt.hash(pass.password, 10, (err, hash) => {
      pass.password = hash;

      existUser.password = pass.password;
      existUser.save();
      res.status(200).send({ message: "Password successfully edited." })
    })

  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Password must contain at least 8 characters, one uppercase, and one number." });
  }
});

module.exports = router;
