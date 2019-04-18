var i = { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   };
var j = { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   };
var l = { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' };
var o = { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' };
var s = { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  };
var t = { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' };
var z = { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    };

function eachblock(type, x, y, dir, fn) {
  var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
  for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
    if (blocks & bit) {
      fn(x + col, y + row);
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
};

function occupied(type, x, y, dir) {
  var result = false
  eachblock(type, x, y, dir, function(x, y) {
    if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x,y))
      result = true;
  });
  return result;
};

function unoccupied(type, x, y, dir) {
  return !occupied(type, x, y, dir);
};

var pieces = [i,j,l,o,s,t,z];
var next = pieces[Math.round(Math.random(0, pieces.length-1))];

var pieces = [];
function randomPiece() {
  if (pieces.length == 0)
    pieces = [i,i,i,i,j,j,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z];
  var type = pieces.splice(random(0, pieces.length-1), 1)[0]; // remove a single piece
  return { type: type, dir: DIR.UP, x: 2, y: 0 };
};

var KEY     = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
    DIR     = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 },
    stats   = new Stats(),
    canvas  = get('canvas'),
    ctx     = canvas.getContext('2d'),
    ucanvas = get('upcoming'),
    uctx    = ucanvas.getContext('2d'),
    speed   = { start: 0.6, decrement: 0.005, min: 0.1 }, // seconds until current piece drops 1 row
    nx      = 10, // width of tetris court (in blocks)
    ny      = 20, // height of tetris court (in blocks)
    nu      = 5;  // width/height of upcoming preview (in blocks)

var dx, dy,        // pixel size of a single tetris block
    blocks,        // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
    actions,       // queue of user actions (inputs)
    playing,       // true|false - game is in progress
    dt,            // time since starting this game
    current,       // the current piece
    next,          // the next piece
    score,         // the current score
    rows,          // number of completed rows in the current game
    step;          // how long before current piece drops by 1 row


function setScore(n)            { score = n; invalidateScore(); };
function addScore(n)            { score = score + n; };
function setRows(n)             { rows = n; step = Math.max(speed.min, speed.start - (speed.decrement*rows)); invalidateRows(); };
function addRows(n)             { setRows(rows + n); };
function getBlock(x,y)          { return (blocks && blocks[x] ? blocks[x][y] : null); };
function setBlock(x,y,type)     { blocks[x] = blocks[x] || []; blocks[x][y] = type; invalidate(); };
function setCurrentPiece(piece) { current = piece || randomPiece(); invalidate();     };
function setNextPiece(piece)    { next    = piece || randomPiece(); invalidateNext(); };


var last = now = timestamp();
function frame() {
  now = timestamp();
  update((now - last) / 1000.0);
  draw();
  last = now;
  requestAnimationFrame(frame, canvas);
}
frame(); // start the first frame

function keydown(ev) {
  if (playing) {
    switch(ev.keyCode) {
      case KEY.LEFT:   actions.push(DIR.LEFT);  break;
      case KEY.RIGHT:  actions.push(DIR.RIGHT); break;
      case KEY.UP:     actions.push(DIR.UP);    break;
      case KEY.DOWN:   actions.push(DIR.DOWN);  break;
      case KEY.ESC:    lose();                  break;
    }
  }
  else if (ev.keyCode == KEY.SPACE) {
    play();
  }
};

function update(idt) {
  if (playing) {
    handle(actions.shift());
    dt = dt + idt;
    if (dt > step) {
      dt = dt - step;
      drop();
    }
  }
};