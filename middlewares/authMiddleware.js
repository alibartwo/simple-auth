const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send("Invalid token.");
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        req.username = decoded.username;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Invalid token!");
    }
};

module.exports = authMiddleware;
