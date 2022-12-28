const express = require("express");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const Users = require("../schemas/users");

const router = express.Router();

const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$")).required(),
    confirmPassword: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$")).required()
});

router.post('/signup', async (req, res) => {
    try {
        const user = await signupSchema.validateAsync(req.body);

        if (user.password !== user.confirmPassword) {
            return res.status(400).send({ message: "Password must match." })
        }

        const existUser = await Users.findOne({ email: user.email });

        if (existUser) {
            return res.status(400).send({ message: "There is already an account with that email. Use another email." })
        }

        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash;
            Users.create({ 
                username: user.username, 
                email: user.email, 
                password: user.password,
                isAdmin: false
            })
                .then(user => {
                    res.status(201).send({ message: `Account with email ${user.email} successfully created.` })
                })
                .catch(err => {
                    res.status(400).send({ message: err.message })
                });
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({ message: "Data format is not valid." });
    }
});

// hanya untuk menambahkan akun admin ke db bukan untuk diterapkan ke front-end
router.post('/createAdmin', async (req, res) => {
    try {
        const user = await signupSchema.validateAsync(req.body);

        if (user.password !== user.confirmPassword) {
            return res.status(400).send({ message: "Password must match." })
        }

        const existUser = await Users.findOne({ email: user.email });

        if (existUser) {
            return res.status(400).send({ message: "There is already an account with that email. Use another email." })
        }

        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash;
            Users.create({ 
                username: user.username, 
                email: user.email, 
                password: user.password,
                isAdmin: true
            })
                .then(user => {
                    res.status(201).send({ message: `Account with email ${user.email} successfully created.` })
                })
                .catch(err => {
                    res.status(400).send({ message: err.message })
                });
        })

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({ message: "Data format is not valid." });
    }
});

module.exports = router;