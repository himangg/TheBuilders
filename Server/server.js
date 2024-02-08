const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath))

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected');
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const PORT = process.env.PORT || 3000;
// const HOST = '192.168.32.11';

server.listen(PORT, () => {
    console.log('Server is running on http://${HOST}:${PORT}');
});

