const http = require('http');
const data = require('./data');
const port = 3000

const server = http.createServer(data);

server.listen(port);

server.on('connection',()=>{
    console.log('Connection Port 3000...')
})

