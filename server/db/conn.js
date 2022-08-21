const { MongoClient } = require("mongodb");
const path = require("path");

const publicPath = path.join(__dirname, "..", "build");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db(process.env.MONGO_DBNAME);
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
