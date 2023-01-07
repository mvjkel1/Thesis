const User = require('./../models/user.model');
function initSocketServer(httpObject){

console.log("initializing socket...")

const io = require('socket.io')(httpObject, {
  cors: {
    origin: 'http://localhost:3001'
  }
})

let activeUsers = [];

io.of('/moodboard').on('connection', (socket) => {
  console.log("connection moodbard")
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data))

});


io.of("/").on('connection', (socket) => {
  // add new User
  socket.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      });
    }
    console.log('Connected users', activeUsers);
    io.emit('get-users', activeUsers);
  });

  // send message
  socket.on('send-message', (data) => {
    const receiverId = data.receiverId;
    console.log("RID")
    console.log(receiverId);
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to : ", receiverId);
    console.log("Data: ", data)
    if (user) {
        console.log("actually sent!")
        io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('disconnect', async () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log('User disconnected', activeUsers);
    io.emit('get-users', activeUsers);
  });
});

httpObject.listen(8800, () => console.log("sockets listening: OK"));

}

module.exports = initSocketServer;