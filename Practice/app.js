const http = require('http');

const rqListener = (req, res)=>{
    console.log(req)
    process.exit();
}
const server = http.createServer(rqListener);

server.listen(3000);