//Ship factory function
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
    const isitmyturn = true;
    var player = 0;
    const setplayer = (num) =>
    {
        player = num;
    }
    const gameb = [[0,0,0,0,0,0,0,0,0,0],
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
    const updateUI = ()=>
    {
        for(var i = 0;i < 10; i++)
        {
            for (var j = 0;j < 10; j++)
            {
                if(gameb[i][j] ===1 && player===1)
                {
                    const id = 'A'+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.classList = "ship";
                }
                else if(gameb[i][j] ===3)
                {
                    const id = 'B'+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.innerText = "X";
                }
                else if(gameb[i][j] ===4)
                {
                    const id = 'B'+i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.innerText = "MISS";
                }
            }
        }
    }
    //function to take a hit
    const takehit = (event) =>
    {
        const row = parseInt(event.target.id[1]);
        const col = parseInt(event.target.id[2]);
        if(gameb[row][col] === 1)
        {
            console.log('KABOOM! A hit');
            gameb[row][col] = 3;
            event.target.classList = "hit";
        }
        else if(gameb[row][col] === 3)
        {
            return;
        }
        else{
            console.log('SPLOOSH!! A miss');
            gameb[row][col] = 4; 
            event.target.classList = "miss";
        }
        updateUI();
        //updating ships
        ships.forEach((ship)=>
        {
            if(ship.coords.includes(row.toString()+col.toString())){
                ship.hit();
                console.log('a hity hit');
            }
            
        })
        checkGO();
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
            location.reload();
            return true;
        }
        return false;
    }
    const reset = () =>
    {
        
    }
    return {generateShips,gameb,ships,updateUI,setplayer,takehit,checkGO};
}
/*create gameboard for g and thier opponent og
 * Also randomly placing thier ships on the grid
 * grid contains 5 ships: a 2tile, two 3tile, a 4tile and one 5tile ship.
 * Opponents ships are hidden, only left (the player's side) ships are visible.
*/
const g = new gameBoard();
const og = new gameBoard();

g.setplayer(1);
g.generateShips();

og.generateShips(); 

////////////////////////////////////

//generating grid for display//////////////////////////////////
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
        grid.appendChild(tile);
    }
}
/////////////////////////////////////////////////////
g.updateUI();
// og.updateUI();

