const canvas_width=900
const canvas_height=900
const tiles_num=11
let tile_size_x=canvas_width/tiles_num
let tile_size_y=canvas_height/tiles_num
let arr_cores=['red', 'blue', 'green', 'orange', 'purple']

function setup() {  
  let canvas = createCanvas(canvas_width, canvas_height)
  canvas.position(windowWidth*0.1, windowHeight*0.1);
  let diceBtn=createButton("roda o dado!");
  diceBtn.position(canvas_width*0.5,0);
  diceBtn.mousePressed(rollDice)
  let index_cor=int(random(0,5))  
  player = new Jogador(0, 0,board[0][0].pos_x, board[0][0].pos_y, arr_cores[index_cor], "João Silva", 5000, 20)
  tabuleito = new Tabuleiro(1)


  let div = createDiv('').size(10, 10);
  div.style('background-color', 'orange');
  div.center();
}

let scene=1

function draw() {
  if (scene==0){
    text(100, 100, "LOGING IN")
  }

  if (scene==1){
    background(255)
    drawBoard()
    player.draw_player()
    player.display_player_status()
    tabuleito.turn_counter()
  }
}