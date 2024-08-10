const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const session = require("express-session");
const helmet = require("helmet");
const passport = require("passport");

const middlewares = (app) => {
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
        session({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true },
        }),
    );
    app.use(cors());
    app.use(compression());
    app.use(helmet());
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = middlewares;
