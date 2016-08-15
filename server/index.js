import express from 'express';
import socketio from 'socket.io';
import http from 'http';

const app = express();
var server = http.Server(app);
var io = socketio(server);

if (app.get('env') !== 'production') {
  var browserSync = require('browser-sync');
  var bs = browserSync({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));
}

app.use((req, res, next) => {
  console.log(`Client requested ${req.path}`);
  next();
});
app.use(express.static('public'));

server.listen(8050, () => {
  console.log('server up and running, connect to http://localhost:8050');

  let totalPlayers = 0;
  io.on('connection', socket => {
    console.log(`Accepted websocket connection for player ${++totalPlayers}`);
    socket.on('init', () => {
      socket.emit('registered', { playerNumber: totalPlayers })
      io.emit('count', { totalPlayers })
    });
    socket.on('disconnect', () => {
      totalPlayers--
      io.emit('count', { totalPlayers });
    });
  });
});
