const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const middlewares = require("./middlewares");
const routes = require("./routes/index");

dotenv.config();

const app = express();

// set up static files
app.use(express.static(path.join(__dirname, "public")));

// using middlewares
middlewares(app);

// routing
routes(app);

const port = process.env.PORT || 5678;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;
