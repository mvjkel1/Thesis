const express = require("express");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

// MIDDLEWARES
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/routes/auth.routes", authRouter);
app.use("/routes/user.routes", userRouter);

module.exports = app;
