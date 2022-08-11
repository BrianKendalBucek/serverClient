const net = require('net');

const client = net.createConnection({
  host: 'localhost',
  port: 54321
});

// client.write('Hello, I am a client!');

client.setEncoding('utf-8');

process.stdin.on('data', (data) => {
  const enteredString = String(data).trim();

  // Print to client
  console.log('You entered:', enteredString);

  // Server will see written string.
  client.write(enteredString); //Trim removes the white space at the beginning or end of a string
});