const usersRouter = require("./userRouter");
const authRouter = require("./authRouter");
const apiRouter = require("./apiRouter");
const cartRouter = require("./cartRouter");
const voucherRouter = require("./voucherRouter");
const { authAdminMiddleware } = require("@middlewares/authMiddleware");

const routes = (app) => {
    app.use("/api", authAdminMiddleware, apiRouter);
    app.use("/user", usersRouter);
    app.use("/auth", authRouter);
    app.use("/cart", cartRouter);
    app.use("/voucher", voucherRouter);
};

module.exports = routes;
