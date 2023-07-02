
// import { io } from "socket.io/dist/client";
var socket = io.connect('http://localhost:3000');


//Ship factory function/////////////////////////////////////////////////////////////////////////////////////////////////
function Ships(len)
{
    const size = len;
    var hits = 0;
    var coords = [];

    const hit = () =>
    {
        hits++;
    }
    const isSunk = () =>
    {
        if(hits ===size)
        {
            return true;
        }
        return false;
    }
    return {hit,isSunk,coords};


}
// function code from mozilla docs
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
/*
Legend: 
1 - ship
0 - sea
3 - hit
4 - miss

*/
function gameBoard()
{
    var isitmyturn = true;
    var player = null;
    const setPlayer = (turn) =>
    {
        player = turn;

    }
    const getPlayer = () =>
    {
        return player;
    }

    const Setmyturn = (turn) =>
    {
        isitmyturn = turn;

    }
    const setB = (gamey) =>
    {
        gameb = gamey;
    }
    const getTurn = () =>
    {
        return isitmyturn;
    }
    var gameover = false;
    var gameb = [[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]];
    var ships = [];
    //Generate 5 ships to be randomly placed on the board
    const generateShips = () =>
    {
        makeship(2);
        makeship(3);
        makeship(3);
        makeship(4);
        makeship(5);   
    }

    const makeship = (sizeofship) =>
    {
        var rot = getRandomArbitrary(0,2);
        var posr = 0;
        var posc = 0;
        var overlapped = true;
        if(rot)
        {
            while(overlapped)
            {
                // console.log('loop');
                posr = getRandomArbitrary(0,10);
                posc = getRandomArbitrary(0,(10-(sizeofship)-1));
                for(var i = 0; i<sizeofship;i++)
                {
                    if(gameb[posr][posc+i]===1)
                    {
                        console.log('overlapped!');
                        overlapped = true;
                        break;
                        
                    }
                    overlapped = false;
                }
            }
            

            var ship = new Ships(sizeofship);
            for(var i = 0; i<sizeofship;i++)
                {
                    gameb[posr][posc+i] = 1;
                    ship.coords.push(posr.toString()+(posc+i).toString());
                }
            ships.push(ship);
        }
        else
        {
            while(overlapped)
            {
                
                // console.log('loop');
                posr = getRandomArbitrary(0,(10-(sizeofship)-1));
                posc = getRandomArbitrary(0,10);
                for(var i = 0; i<sizeofship;i++)
                {
                    if(gameb[posr+i][posc]===1)
                    {
                        console.log('overlapped!');
                        overlapped = true;
                        break;
                    }
                    overlapped = false;
                }
            }
            // console.log(overlapped);

            ship = new Ships(sizeofship);
            for(var i = 0; i<sizeofship;i++)
                {
                    gameb[posr+i][posc] = 1;
                    ship.coords.push((posr+i).toString()+posc.toString());
                }
                ships.push(ship);
        }
        
    }
    const updateUI = (ignoreship = false)=>
    {
        var p = '';
        if(player === 1){
            p+='A';
        }
        else{
            p+='B'
        }
        for(var i = 0;i < 10; i++)
        {
            for (var j = 0;j < 10; j++)
            {
                if(gameb[i][j] ===1 && ignoreship === false)
                {
                    const id = p+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.classList = "ship";
                }
                else if(gameb[i][j] ===3)
                {
                    const id = p+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.innerText = "X";
                }
                else if(gameb[i][j] ===4)
                {
                    const id = p+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.innerText = "MISS";
                }
            }
        }
    }
    //function to take a hit
    const takehit = (event) =>
    {
        if(getTurn())
        {
            console.log("not your turn");
            return;
        }
        var hitormiss = null;
        const row = parseInt(event.target.id[1]);
        const col = parseInt(event.target.id[2]);
        // gameb = this.gameb;
        console.log(gameb);
        if(gameb[row][col] === 1)
        {
            console.log('KABOOM! A hit');
            gameb[row][col] = 3;
            event.target.classList = "hit";
            hitormiss = true;
        }
        else if(gameb[row][col] === 3)
        {
            return;
        }
        else{
            console.log('SPLOOSH!! A miss');
            gameb[row][col] = 4; 
            event.target.classList = "miss";
            hitormiss = false;
        }
        updateUI(true);
        //updating ships
        ships.forEach((ship)=>
        {
            if(ship.coords.includes(row.toString()+col.toString())){
                ship.hit();
                console.log('a hity hit');
            }
            
        })
        checkGO();
        //sending hit coordinates to other player
        socket.emit("hit",row,col,hitormiss);
        isitmyturn = true;
        // passover();
        
        // console.log(gameb);
    }
    const checkGO = () =>
    {
        var count = 0
        ships.forEach((ship)=>
        {
            if(ship.isSunk())
            {
                count++;
            }
        })
        if(count === 5)
        {
            alert('All ships sunk');
            gameover = true;
            location.reload();
            
            return true;
        }
        return false;
        
    }
    
    return {generateShips,gameb,ships,updateUI,Setmyturn,takehit,checkGO,gameover,getTurn,setB,setPlayer};
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*create gameboard for g and thier opponent og
 * Also randomly placing thier ships on the grid
 * grid contains 5 ships: a 2tile, two 3tile, a 4tile and one 5tile ship.
 * Opponents ships are hidden, only left (the player's side) ships are visible.
*/

var g = new gameBoard();
var og  = new gameBoard();

g.setPlayer(1);



g.generateShips();


socket.on('sendboard',()=>
{
    console.log('insendboard',g);

    
    socket.emit('sentboard',JSON.stringify(g));
    

});
socket.on('recieveoppo',(ogg,dibs)=>
{
    
    const ogy = JSON.parse(ogg);
    console.log("ogg",ogy.gameb);
    og.setB(ogy.gameb);

    if(dibs)
    {
        og.Setmyturn(true);
    }
    else{
        og.Setmyturn(false);
    }
    socket.emit('doneloading');
    console.log('help in recieveoppo');
    console.log(g)
    console.log(og);
})
socket.on("retry",()=>
{
    socket.emit("tryingagain");
})
socket.on('loadui',()=>
{
    console.log('loadingui');
    const grid= document.querySelector(".gri");
    const gridop = document.querySelector(".playarea > div:last-child");
    
    for(var i = 0;i < 10; i++)
    {
        for (var j = 0;j < 10; j++)
        {
            const tile = document.createElement("div");
            
            tile.id='B'+i.toString()+j.toString();
            tile.addEventListener('click',og.takehit);
            
    
            gridop.appendChild(tile);
            
        }
    }
    for(var i = 0;i < 10; i++)
    {
        for (var j = 0;j < 10; j++)
        {
            const tile = document.createElement("div");
            tile.id='A'+i.toString()+j.toString();
            tile.addEventListener('click',g.takehit);
            grid.appendChild(tile);
        }
    }
    /////////////////////////////////////////////////////
    g.updateUI();
})

socket.on("reacttohit",(row,col,hitormiss)=>
{
    
    if(hitormiss && g.getTurn())
    {
        g.gameb[row][col] = 3;
    }
    else if(g.getTurn()){
        g.gameb[row][col] = 4;
    }
    og.Setmyturn(false);
    g.updateUI();
    
    
})


////////////////////////////////////

//generating grid for display//////////////////////////////////

//gameloop for single player
/*
var gridTiles = document.querySelectorAll(".gri div");
var gridopTiles = document.querySelectorAll(".playarea > div:last-child div");
function passover()
{
    if(!g.getTurn())
    {
        gridopTiles.forEach((tile)=>
        {
            tile.classList = "no";
        })
        g.updateUI();
        // og.updateUI()
        g.Setmyturn(true);
        og.Setmyturn(false);
    }
    else{

    
    gridTiles.forEach((tile)=>
        {
            tile.classList = "no";
        })
        og.updateUI();
        
        og.Setmyturn(true);
        g.Setmyturn(false);
    }
    
}
*/

// og.updateUI();

