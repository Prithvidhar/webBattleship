const express = require('express');
console.log('pootis');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io")(server,{
//     cors: {
//         origin: "https://localhost:3000",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//       }




// })
const io = require('socket.io')(server,{cors: {origin: "*"}});
// const io = new Server(server);
let port = process.env.PORT || 3000;
server.listen(port)

//Player factory function
function Player()
{
    const gameboard = null;

    const setGameboard = (board) =>
    {
        gameboard = board;
    }

    const getGameboard = () =>
    {
        return gameboard;
    }
}
var num = 0
io.on("connection",(socket)=>
{
    num++;
    console.log('hello Player!');
    
    if(num >=2)
    {
        console.log('2p');
        socket.broadcast.emit('sendboard');
    }
    socket.on('sentboard',(g)=>

    {
        console.log('hi');
        socket.broadcast.emit('recieveoppo',g);
    })
    socket.on('doneloading',()=>{
        console.log('hi');
        console.log('loadui');
        io.emit('loadui');
    })
   


})




