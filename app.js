let rows,cols,scale = 100;

let cells;
let board;
let canvas;
let score;
let btn;

let prevKey;

let bestScore;
let best;
let lost;

function make2D(){
  let arr = new Array(cols);
  for(let i=0;i<arr.length;i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

let clack;

function preload(){
  clack = loadSound('clack.wav');
}


function setup(){
  canvas = createCanvas(400,400);
  
  rows = height/scale;
  cols = width/scale;

  cells = make2D();
  score = createDiv();
  btn = createButton('Restart Game');
  score.parent('scores');
  canvas.parent('container');
  btn.parent('container');
  btn.id('btn');
  lost = createDiv();
  lost.parent('container');
  console.log(lost);

  bestScore = localStorage.getItem('best');
  best = createDiv(`<h3>HIGHSCORE : ${bestScore}</h3>`);
  best.parent('scores');
  
  restartGame();
}


let ind = 0;

function draw(){
  background(51);


 
  // console.log(bestScore);
  score.html(`<h3>SCORE : ${board.score}</h3>`);

  for(let i = 0;i<rows;++i){
    for(let j = 0;j<cols;j++){
      board.cells[i][j].show();
    }
  }
  
  
  board.move();


  prevKey = keyCode;

  if(gameEnd()) {
    if(allFill()){
     //restartGame();
     //console.log('end');


     board.move();
     for(let i = 0;i<rows;++i){
      for(let j = 0;j<cols;j++){
        board.cells[i][j].show();
      }
    }

    
    if(board.score>bestScore){
        bestScore = board.score;  
      }
    best.html(`<h3>HIGHSCORE : ${bestScore}</h3>`);
    localStorage.setItem('best',bestScore);

     lost.html('<p>GAMEOVER</p>');
     noLoop();
  }
}

  btn.mousePressed(restartGame);

}

function allFill(){
  for(let i = 0;i<rows;++i){
    for(let j = 0;j<cols;j++){
      let t = checkNeighbours(i,j);
      if(t){ 
        //console.log('not lost');
        return false; 
      }
    }
  }
  return true;
}

function checkNeighbours(ii,ij){
  let c=0;
  for(let i = -1;i<=1;++i){
     for(let j = -1;j<=1;j++){
        let xoff = ii+i;
        let yoff = ij+j;
        if(abs(i+j)==1 && xoff>-1 && xoff<cols && yoff>-1 && yoff<rows && i+j!=0){
            if(board.cells[ii][ij].val==board.cells[xoff][yoff].val) c++;
        }
      }
    }
  return c>0;
}

function restartGame(){

  for(let i = 0;i<rows;++i){
    for(let j = 0;j<cols;j++){
      cells[i][j] = new Cell(i,j);
    }
  }
  board = new Board(cells);
  board.start();
  lost.html('');
 //console.log(lost);
  loop();
}

function keyPressed(){

  switch(keyCode){
     case  UP_ARROW: board.dir = createVector(0,-1);
                     break;
     case  DOWN_ARROW: board.dir = createVector(0,1);
                     break;
     case  LEFT_ARROW: board.dir = createVector(-1,0);
                     break;
     case  RIGHT_ARROW: board.dir = createVector(1,0);
                     break;
  
  }

 
    if(keyCode!=prevKey && (keyCode==UP_ARROW
      ||keyCode==RIGHT_ARROW
      ||keyCode==LEFT_ARROW
      ||  keyCode==DOWN_ARROW)) board.first = true;
}

function newCell(){
  let c = random(board.cells);
  c = random(c);
  if(c.val==0) {
    c.val = chooseRandom();
    return;
  }
  else newCell();
}

function gameEnd(){
  let c=0;
  for(let i=0;i<rows;++i){
    for(let j=0;j<cols;j++){
        if(board.cells[i][j].val==0) c++;
    }
  }
  return c==0;
}
