const usersRouter = require("./userRouter");
const authRouter = require("./authRouter");
const cartRouter = require("./cartRouter");
const apiRouter = require("./apiRouter");

const routes = (app) => {
    app.use("/api", apiRouter);
    app.use("/user", usersRouter);
    app.use("/auth", authRouter);
    app.use("/cart", cartRouter);
};

module.exports = routes;
