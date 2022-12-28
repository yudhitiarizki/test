require("dotenv").config();
const express = require("express");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const Users = require("../schemas/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$")).required(),
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Account not found." });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1 days",
      });
      return res.status(200).send({ data: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
      }})
    } else {
      return res.status(400).send({ message: "Wrong password."})
    }

  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Data format is not valid." });
  }
});

module.exports = router;