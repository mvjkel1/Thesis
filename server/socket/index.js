const User = require('./../models/user.model');
function initSocketServer(httpObject){
const io = require('socket.io')(httpObject, {
  cors: {
    origin: 'http://localhost:3001'
  }
})

let activeUsers = []; // Communication 
let drawings = {} // Moodboard

io.of('/moodboard').on('connection', (socket) => {
  if(!socket.handshake.auth.workgroup) return;

  // Existing moodboards
  if(drawings[socket.handshake.auth.workgroup]){
    socket.emit('previousDrawings', drawings[socket.handshake.auth.workgroup].drawings);
    drawings[socket.handshake.auth.workgroup].online.push({...socket.handshake.auth.user, socketId: socket.id});
  }
  // New moodboards
  else{
    drawings[socket.handshake.auth.workgroup] = {online: [], drawings: []};
    drawings[socket.handshake.auth.workgroup].online.push({...socket.handshake.auth.user, socketId: socket.id});
  }

  // Join socket to group's room
  socket.join(socket.handshake.auth.workgroup)

  // Emit online users in room.
  io.of('/moodboard').to(socket.handshake.auth.workgroup).emit('online', drawings[socket.handshake.auth.workgroup].online); 
  socket.on('drawing', (data) => {
    socket.to(socket.handshake.auth.workgroup).emit('drawing', data); 
    drawings[socket.handshake.auth.workgroup].drawings.push(data);
  })
  socket.on('clear', () => {
    drawings[socket.handshake.auth.workgroup].drawings = []
    socket.to(socket.handshake.auth.workgroup).emit('clear', {}); 
  })
  socket.on('disconnect', () => {
    drawings[socket.handshake.auth.workgroup].online = drawings[socket.handshake.auth.workgroup].online.filter((user) => user.socketId !== socket.id);
  });
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
    io.emit('get-users', activeUsers);
  });

  // send message
  socket.on('send-message', (data) => {
    const receiverId = data.receiverId;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
        console.log("actually sent!")
        io.to(user.socketId).emit('receive-message', data)
    }
  })

  socket.on('disconnect', async () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit('get-users', activeUsers);
  });
});
}

module.exports = initSocketServer;