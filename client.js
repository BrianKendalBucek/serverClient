const net = require('net');

const client = net.createConnection({
  host: 'localhost',
  port: 54321
});

client.write('Hello, I am a client!');