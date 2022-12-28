const express = require("express");
const FoodPosts = require("../schemas/foodPosts");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/admin/post', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (isAdmin === false) {
        return res.status(400).send({ message: "Only admin can view all of the posts." })
    }

    const postList = await FoodPosts.find({ status: 'approved' }).exec();

    if (postList.length < 1) {
        return res.status(400).send({ message: 'Post not found.' });
    }

    const result = postList.map(request => ({
        postId: request._id,
        foodName: request.foodName,
        region: request.region,
        imageUrls: request.imageUrls,
        description: request.description,
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

router.get('/admin/request', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (isAdmin === false) {
        return res.status(400).send({ message: "Only admin can view pending user requests." })
    }

    const pendingRequest = await FoodPosts.find({ status: 'pending' }).exec();

    if (pendingRequest.length < 1) {
        return res.status(400).send({ message: 'There is no pending request.' });
    }

    const result = pendingRequest.map(request => ({
        postId: request._id,
        foodName: request.foodName,
        region: request.region,
        imageUrls: request.imageUrls,
        description: request.description,
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

router.patch('/admin/request/approve', authMiddleware, async (req, res) => {
    const { postId } = req.body;
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (isAdmin === false) {
        return res.status(400).send({ message: "Only admin can approve this request." });
    }

    try {
        const existRequest = await FoodPosts.findById(postId);

        if (existRequest.status !== 'pending') {
            return res.status(400).send({ message: 'This request has been approved or rejected.'})
        }

        existRequest.status = 'approved';
        await existRequest.save();

        return res.status(200).send({ message: "Request approved." })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({ message: 'Request not found.' });
    }
});

router.patch('/admin/request/reject', authMiddleware, async (req, res) => {
    const { postId } = req.body;
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (isAdmin === false) {
        return res.status(400).send({ message: "Only admin can reject this request." });
    }

    try {
        const existRequest = await FoodPosts.findById(postId).exec();

        if (existRequest.status !== 'pending') {
            return res.status(400).send({ message: 'This request has been approved or rejected.'})
        }

        existRequest.status = 'rejected';
        await existRequest.save();

        return res.status(200).send({ message: "Request rejected." })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({ message: 'Request not found.' });
    }
});

module.exports = router;