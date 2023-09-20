import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname);
});
  
// app.get('/', (req, res) => {
//   res.send('<h1>Hello Socket.io!</h1>');
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('<io># message: ' + msg);
//     });
//   });

// io.on('connection', (socket) => {
//     console.log('<io># a user connected');
//     socket.on('disconnect', () => {
//       console.log('<io># user disconnected');
//     });
// });
  
// io.on('connection', (socket) => {
//     console.log('<io># a user connected');
// });
  
server.listen(3000, () => {
  console.log('<http># server running at http://localhost:3000');
});