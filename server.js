import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})
  
// io.on('connection', (socket) => {
//   console.log(`Socket_ID: ${socket.id} has joined our Server!`)
//   socket.on('disconnect', ()=>{
//       console.log(`Socker_ID: ${socket.id} has desconected from our Server!`)
//   })
// })

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg)
//     })
//   })
  
server.listen(3000, () => {
  console.log('<http># server running at http://localhost:3000');
});