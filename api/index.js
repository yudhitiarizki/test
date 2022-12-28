const signupRouter = require("./register");
const loginRouter = require("./login");
const foodsRouter = require("./foodPosts");
const userRouter = require("./user");
const adminRouter = require("./admin");
const listRouter = require("./foodList");
const detailRouter = require("./detail");
const commentRouter = require("./comments");
const usersettingRouter = require("./usersetting");
const testRouter = require("./test");

module.exports = [
    signupRouter,
    loginRouter,
    foodsRouter,
    userRouter,
    adminRouter,
    listRouter,
    detailRouter,
    commentRouter,
    testRouter,
    usersettingRouter
];
