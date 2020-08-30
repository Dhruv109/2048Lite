class Cell{
  constructor(x,y){
    this.pos = createVector(x*scale,y*scale);
    this.val = 0;
    this.count = 0;
    this.first = true;
  }

  show(){
    noStroke();
    if(this.val!=0){
      let v = pow(this.val,0.2);
      let t = map(v,0,4,0,255);
      fill(255-t*2,255-t,t);
    }
    else fill(255);
    rectMode(CENTER);
    rect(this.pos.x+scale/2,this.pos.y+scale/2,scale-5,scale-5,1);

    if(this.val!=0){
      stroke(0);
      fill(255);
      textAlign(CENTER,CENTER);
      textSize(32);
      text(this.val,this.pos.x+scale/2,this.pos.y+scale/2);
    }
  }
}


class Board{
  constructor(cells){
    this.cells =  cells;
    this.dir =  createVector();
    this.score = 0;
  }

  start(){
    for(let i=0;i<2;++i){
      newCell();
    }  
  }
  

  move(){

    this.count = 0;

    let s = this.score;

    if(board.dir.x == 1){
      for(let i=0;i<rows-1;++i){
        for(let j=0;j<cols;++j){
          if(this.cells[i][j].val!=0){
            if( this.cells[i+1][j].val == this.cells[i][j].val){
              this.cells[i+1][j].val = 2*this.cells[i][j].val;
              this.score+=this.cells[i][j].val;
              this.cells[i][j].val = 0;
              this.count++;
           }
           else if(this.cells[i+1][j].val==0) {
            this.cells[i+1][j].val = this.cells[i][j].val;
            this.cells[i][j].val = 0;
            this.count++;
          }
        }
        }
      }
    }

    if(board.dir.x == -1){
      for(let i=rows-1;i>=1;--i){
        for(let j=0;j<cols;++j){
          if(this.cells[i][j].val!=0){
            if( this.cells[i-1][j].val == this.cells[i][j].val){
              this.cells[i-1][j].val = 2*this.cells[i][j].val;
              this.score+=this.cells[i][j].val;
              this.cells[i][j].val = 0;
            this.count++;
           }
           else if(this.cells[i-1][j].val==0){ this.cells[i-1][j].val = this.cells[i][j].val;
            this.cells[i][j].val = 0;
            this.count++;
          }
        }
        }
      }
    }
    if(board.dir.y == -1){
      for(let i=0;i<rows;++i){
        for(let j=cols-1;j>=1;--j){
          if(this.cells[i][j].val!=0){
            if( this.cells[i][j-1].val == this.cells[i][j].val){
              this.cells[i][j-1].val = 2*this.cells[i][j].val;
              this.score+=this.cells[i][j].val;
              this.cells[i][j].val = 0;
              this.count++;
           }
           else if(this.cells[i][j-1].val==0){this.cells[i][j-1].val = this.cells[i][j].val;
            this.cells[i][j].val = 0;
            this.count++;
          }
        }
        }
      }
    }
    if(board.dir.y == 1){
      for(let i=0;i<rows;++i){
        for(let j=0;j<cols-1;++j){
          if(this.cells[i][j].val!=0){

                      
           if( this.cells[i][j+1].val == this.cells[i][j].val){
              this.cells[i][j+1].val = 2*this.cells[i][j].val;
              this.score+=this.cells[i][j].val;
              this.cells[i][j].val = 0;
           }
           else if(this.cells[i][j+1].val==0)
           {
             this.cells[i][j+1].val = this.cells[i][j].val;
            this.cells[i][j].val = 0;
            this.count++;
          }
        }

        }
      }
    }

    if(this.count == 0 && this.first && !gameEnd()){
      this.dir = createVector();
      newCell();
      this.first = false;
    }

    if(this.score!=s) clack.play();

   

  }

}
function chooseRandom(){
  if(random(1)<0.9) return 2;
  else return 4;
}
