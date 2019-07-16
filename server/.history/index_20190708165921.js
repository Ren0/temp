const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('connection');

  socket.on('changed', (msg) => {
    console.log('message', msg);
    io.emit('changed', { ...msg, a: 10 });
  });

  socket.on('room', (room) => {
    console.log('room', room);
    socket.join(room);
  });
});

io.sockets.in(room).emit('message', 'what is going on, party people?');

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
