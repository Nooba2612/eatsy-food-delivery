const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const routes = require("@routes/index");
const usersRouter = require("@routes/userRouter");
const middlewares = require("@middlewares/index");
const { connectToDatabase } = require("@config/database");

dotenv.config();

const app = express();

// set up static files
app.use(express.static(path.join(__dirname, "public")));

// using middlewares
middlewares(app);

// routing
routes(app);

// connect to the database
// connectToDatabase();

module.exports = app;
