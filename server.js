const net = require('net');
const PORT = 54321;

const server = net.createServer();

server.listen(PORT, () => {
  console.log('The server is listening on port:', PORT);
});

server.on('connection', (connection) => {
  console.log('A new client is connected.');

  connection.setEncoding('utf-8');

  connection.on('data', (data) => {
    console.log(data);
  });
});