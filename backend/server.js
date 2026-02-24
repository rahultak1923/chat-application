const app = require("./app");
const http = require('http');
const {Server}=require("socket.io");
const socketConnection = require("./socket/socket")

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
    }
})
socketConnection(io)

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

module.exports ={io};