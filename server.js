const https = require('https');
const fs = require('fs');

const server = https.createServer({
  key: fs.readFileSync('./ssl/mycert.key'),
  cert: fs.readFileSync('./ssl/mycert.crt'),
}, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS!');
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
