const PORT = process.env.PORT;
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
// const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const groupRouter = require("./routes/group.routes");
const classRouter = require("./routes/class.routes");

const corsOptions = {
  origin: "127.0.0.1:" + PORT.toString(),
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/classes", classRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});
module.exports = app;
