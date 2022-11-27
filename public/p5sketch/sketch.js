const canvas_width=900
const canvas_height=900
const tiles_num=11
let tile_size_x=canvas_width/tiles_num
let tile_size_y=canvas_height/tiles_num
let arr_cores=['red', 'blue', 'green', 'orange', 'purple']

function setup() {  
  createCanvas(canvas_width, canvas_height)
  let diceBtn=createButton("roda o dado pá!");
  diceBtn.position(canvas_width*0.5,0);
  diceBtn.mousePressed(rollDice)
  let index_cor=int(random(0,5))  
  player = new Jogador(0, 0,board[0][0].pos_x, board[0][0].pos_y, arr_cores[index_cor], "joaoZinho", 5000, 20)
}

function draw() {
  background(255)
  drawBoard()
  player.draw_player()
  player.display_player_status()
}

function drawBoard() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw_tile();
    }
  }
}