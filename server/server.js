const path = require('path');
const publicPath = path.join(__dirname,'../public');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateText, generateLocationMessage} = require('./utils/message');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));
var io = socketIO(server);
io.on('connection', (socket) =>{
  console.log('New User Registered');
 // socket.emit('newEmail', {
 //   from:"mike@example.com",
 //   text:"Hello",
 //   createdAt:123
 // });

// socket.on('createEmail', (newEmail) =>{
//   console.log('createEmail', newEmail);
// });

// socket.emit('newMessage', {
//   from:"server",
//   text:"hello",
//   createdAt:123
// })
socket.emit('newMessage', generateText('Admin', 'Welcome to ChatApp') );
socket.broadcast.emit('newMessage', generateText('Admin','New User has joined'));
socket.on('createMessage', (newMessage, callback) => {
  console.log('createMessage', newMessage);
  io.emit('newMessage', generateLocationMessage(newMessage.from, newMessage.text));
  callback('This is from the server');
});

socket.on('createLocationMessage', (coords) => {
  io.emit('newLocationMessage', generateText('Admin', coords.latitude, coords.longitude));
});

  socket.on('disconnect', () =>{
    console.log('Client Disconnected');
  });
});


server.listen(port, ()=>{
  console.log(`Server starting at ${port}`);
});
