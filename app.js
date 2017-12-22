const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', (client) => {
  console.log('client connected...');

  client.on('join', (data) => {
    console.log(data);
    client.emit('messages', 'Hello from server');
  })
  
  client.on('messages', (data) => {
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
  })

})



server.listen(8080);