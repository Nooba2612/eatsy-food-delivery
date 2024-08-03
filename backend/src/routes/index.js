const usersRouter = require("./userRouter");

const routes = (app) => {
    app.use("/user", usersRouter);
};

module.exports = routes;
