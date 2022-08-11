const net = require('net');
const PORT = 54321;

const server = net.createServer();

const question = 'Do you like JavaScript?';
const answers = [];
const displayResults = () => {
  let likes = 0;
  let dislikes = 0;
  let total = 0;

  answers.forEach((answer, index) => {
    if (answer) likes++;
    else dislikes ++;
  });

  return `\tlikes: ${likes}\n\tdislikes: ${dislikes}\n\ttotal: ${likes + dislikes}`;
};

server.listen(PORT, () => {
  console.log('The server is listening on port:', PORT);
});

server.on('connection', (connection) => {
  console.log('A new client is connected.');
  connection.setEncoding('utf-8');

  connection.write(`Question to Vote On: ${question} \r\nPlease type either: [Y/N]`);

  connection.on('data', (data) => {
    console.log('Vote received: ', data);
    const reply = String(data).toLowerCase();
    if (reply == 'y') {
      answers.push(true);
      connection.write(displayResults());
    } else if (reply == 'n') {
      answers.push(false);
      connection.write(displayResults());
    } else {
      connection.write('Invalid vote.')
    } 
  });

  connection.on('error', (error) => {
    // console.log(error);
    // Handle unexpected connection loss
    if (error.code == 'ECONNRESET') console.log('A client has ended their sessoin');
    else console.log(error);
  })

  connection.on('end', () => {
    console.log('A client has ended their session');
  })
});