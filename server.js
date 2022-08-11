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

  connection.on('error', (error) => {
    // console.log(error);
    //Handle unexpected connection loss
    if (error.code == 'ECONNRESET') console.log('A client has ended their sessoin');
    else console.log(error);
  })

  connection.on('end', () => {
    console.log('A client has ended their session');
  })
});