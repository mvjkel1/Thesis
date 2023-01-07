const mongoose = require('mongoose');
const dotenv = require('dotenv');
const initSocketServer = require('./socket/index');
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
}); 

const app = require('./app');
const http = require('http').createServer(app);
initSocketServer(http);

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env_jest' });
} else {
  dotenv.config({ path: './.env' });
}

const DB = process.env.MONGO_URI.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    dbName: `${process.env.MONGO_DBNAME}`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Handle rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
