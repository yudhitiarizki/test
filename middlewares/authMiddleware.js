require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../schemas/users");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            message: "Login is needed.",
        });
        return;
    }

    try {
        const { userId } = jwt.verify(authToken, process.env.SECRET_KEY);
        Users.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({ message: "Login is needed." });
    }
};