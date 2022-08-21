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
