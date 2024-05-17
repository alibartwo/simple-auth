const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.getUserByUsername(username);
        if (existingUser) {
            res.status(409).send("User already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 13);
        const user = User.createUser(username, hashedPassword);

        res.status(200).send("User registered succesfully!");
    } catch (err) {
        console.log("Error while registering", err);
        res.status(500).send("Error occured while registering.");
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.getUserByUsername(username);
        if (!user) {
            res.status(401).send("Wrong username!");
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).send("Wrong password!");
            return;
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/profile");
    } catch (err) {
        console.log("Error while logining", err);
        res.status(500).send("Error occured while logining.");
    }
};

module.exports = { register, login };
