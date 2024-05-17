const express = require("express");
const app = express();
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const errorHandler = require("./utils/errorHandler");
const session = require("express-session");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(express.json());
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

app.unsubscribe(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is listenin on localhost:${PORT}`));
