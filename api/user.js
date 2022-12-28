const express = require("express");
const FoodPosts = require("../schemas/foodPosts");
const authMiddleware = require("../middlewares/authMiddleware");
const Joi = require("joi");
const Users = require("../schemas/users");

const router = express.Router();

router.get('/user/request', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const userId = user._id;

    const userRequests = await FoodPosts.find({ userId }).exec();

    if (userRequests.length < 1) {
        return res.status(400).send({ message: 'Request not found.' });
    }

    const result = userRequests.map(request => ({
        postId: request._id,
        foodName: request.foodName,
        region: request.region,
        imageUrls: request.imageUrls,
        description: request.description,
        status: request.status,
        createdAt: request.createdAt
    }))

    result.sort((a, b) => {
        const date1 = a.createdAt;
        const date2 = b.createdAt;
        if (date1 < date2) {
            return 1
        } else if (date1 > date2) {
            return -1
        } else {
            return 1
        }
    });

    return res.status(200).send({ data: result });
});

const emailSchema = Joi.object({
    email: Joi.string().email().required()
})

router.patch('/user/email', authMiddleware, async (req, res) => {
    try {
        const { user } = res.locals;
        const userId = user._id;
        const { email } = await emailSchema.validateAsync(req.body);

        const existUser = await Users.findOne({ email: email });

        if (existUser) {
            return res.status(400).send({ message: "There is already an account with that email. Use another email." })
        }

        try {
            const currentUser = await Users.findById(userId).exec();

            currentUser.email = email;
            await currentUser.save();

            return res.status(200).send({ message: "Email successfully edited." })
        } catch (error) {
            console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(400).send({ message: 'User not found.' });
        }
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({ message: "Must be a valid email." });
    }
})

module.exports = router;