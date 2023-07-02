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
var dibs = true;
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
    if(num>2){
        console.log("Game in session! Wait your turn!");
        return;
    }
    console.log('hello Player!');

    
    if(num ===2)
    {
        console.log('2p');
        socket.broadcast.emit('sendboard',dibs);
        
        
    }
    else{
        socket.emit("retry");
    }
    socket.on("tryingagain",()=>
    {
        // console.log("alone....");
        if(num>=2)
        {
            socket.broadcast.emit('sendboard');
        }
        else{
            socket.emit("retry");
        }
    })
    socket.on('sentboard',(g)=>

    {
        console.log('hi');
        if(dibs)
        {
            // console.log(g);
            socket.broadcast.emit('recieveoppo',g,dibs);
            dibs = false;
        }
        else{
            socket.broadcast.emit('recieveoppo',g,dibs);
        }
        
    })

    socket.on('doneloading',()=>{
        console.log('hi');
        console.log('loadui');
        socket.emit('loadui');
    })


   socket.on("hit",(row, col,hitormiss)=>
   {
    socket.broadcast.emit("reacttohit",row,col,hitormiss);
   })


})
io.on("disconnect",(socket)=>
{
    num--;
    socket.broadcast.emit("retry");
})




