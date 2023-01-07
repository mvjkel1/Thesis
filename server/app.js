const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const userRouter = require('./routes/user.routes');
const groupRouter = require('./routes/group.routes');
const classRouter = require('./routes/class.routes');
const eventRouter = require('./routes/calendar.event.routes');
const conversationRouter = require('./routes/conversation.routes');
const messageRouter = require('./routes/message.routes');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/app.error');
const PORT = process.env.PORT;
const { StatusCodes } = require('http-status-codes');
const publicPath = path.join(__dirname, '../client', 'build');


const app = express();
const corsOptions = {
  origin: '127.0.0.1:' + 3001
};

// HTTP security headers
app.use(helmet());

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Please try again in an hour - too many requests from this IP'
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/classes', classRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/messages', messageRouter);
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});


app.use(globalErrorHandler);
module.exports = app;
