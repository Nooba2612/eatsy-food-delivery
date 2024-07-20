const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const compression = require("compression");

const indexRouter = require("./routes/index");

const app = express();

require("dotenv").config();
const port = process.env.PORT;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// using middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cors());
app.use(compression());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;
