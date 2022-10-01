<<<<<<< Updated upstream
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dbo = require("./db/conn");
const publicPath = path.join(__dirname, "..", "build");
const PORT = process.env.PORT || 3001;

const app = express();
var corsOptions = {
  origin: "http://localhost:" + PORT.toString(),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port ${PORT}.`);
});
=======
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./env" });
const app = require("./app");

const DB = process.env.MONGO_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Handle rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
>>>>>>> Stashed changes
