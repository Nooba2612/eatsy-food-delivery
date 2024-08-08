const usersRouter = require("./userRouter");
const authRouter = require("./authRouter");

const routes = (app) => {
    app.use("/user", usersRouter);
    app.use("/login", authRouter);
};

module.exports = routes;
