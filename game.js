//Ship factory function
function Ships(len)
{
    const size = len;
    const hits = 0;
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
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
function gameBoard()
{
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
        
        //First ship, size 1
        
        //Second ship
        makeship(2);
        makeship(3);
        makeship(3);
        makeship(4);
        makeship(5);
        console.log(gameb);
        //rotation
        
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
                console.log('loop');
                posr = getRandomArbitrary(0,10);
                posc = getRandomArbitrary(0,(10-(sizeofship)-1));
                for(var i = 0; i<sizeofship;i++)
                {
                    if(gameb[posr][posc+i]===1)
                    {
                        console.log('overlapped!');
                        break;
                        
                    }
                    overlapped = false;
                }
            }
            

            var ship = new Ships(sizeofship);
            for(var i = 0; i<sizeofship;i++)
                {
                    gameb[posr][posc+i] = 1;
                    ship.coords.push([posr,posc+i]);
                }
            ships.push(ship);
        }
        else
        {
            while(overlapped)
            {
                
                console.log('loop');
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
                    ship.coords.push([posr+i,posc]);
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
                if(gameb[i][j] ===1)
                {
                    const id = i.toString()+j.toString();
                    var tile = document.getElementById(id);
                    tile.classList = "ship";
                }
            }
        }
    }
    return {generateShips,gameb,ships,updateUI};
}
// console.log(gameBoard.gameb);
const g = new gameBoard();
const og = new gameBoard();
// console.log(g.gameb);

// g.generateShips();
// console.log(g.ships);
g.generateShips();
og.generateShips(); 
const grid= document.querySelector(".gri");
const gridop = document.querySelector(".playarea > div:last-child");
// console.log(grids);
for(var i = 0;i < 10; i++)
{
    for (var j = 0;j < 10; j++)
    {
        const tile = document.createElement("div");
        tile.id=i.toString()+j.toString();

        gridop.appendChild(tile);
    }
}
for(var i = 0;i < 10; i++)
{
    for (var j = 0;j < 10; j++)
    {
        const tile = document.createElement("div");
        tile.id=i.toString()+j.toString();
        grid.appendChild(tile);
    }
}
g.updateUI();

