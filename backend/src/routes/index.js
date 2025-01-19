const usersRouter = require("./userRouter");
const authRouter = require("./authRouter");
const apiRouter = require("./apiRouter");
const { authAdminMiddleware } = require("@middlewares/authMiddleware");

const routes = (app) => {
    app.use("/api", authAdminMiddleware, apiRouter);
    app.use("/user", usersRouter);
    app.use("/auth", authRouter);
};

module.exports = routes;
