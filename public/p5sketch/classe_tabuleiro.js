class Tile {

  constructor(x, y, pos_x, pos_y) {
    this.x = x;
    this.y = y;
    this.pos_x = pos_x
    this.pos_y = pos_y
  }

  draw_tile() {
    push()
    noStroke()
    rect(this.pos_x, this.pos_y, tile_size_x, tile_size_y);
    pop();
  }
}

board = []
let sideX = 0
let sideY = 0
for (let x = 0; x < tiles_num; x++) {
  board[x] = []
  for (let y = 0; y < tiles_num; y++) {
    board[x][y] = new Tile(x, y, sideX, sideY);
    sideY += tile_size_y
  }
  sideX += tile_size_x
  sideY = 0
}

function drawBoard() {

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {

      board[i][j].draw_tile()
    }
  }

}

//get all players
function createBoard() {
  let arrPins = [img_pinPizza, img_pinMoon, img_pintMushroom, img_pinStar, img_pinSmiley]
  loadJSON("/getPlayersPosition/", (response) => {

    for (let k = 0; k < response.length; k++) {

      push()
      image(arrPins[k], response[k].pos_x * tile_size_x + tile_size_x * 0.2, response[k].pos_y * tile_size_y + tile_size_y * 0.4, tile_size_x * 0.5, tile_size_x * 0.5)
    }

  });

}

function rollDice() {
  diceRoll = int(random(1, 7));
  console.log(diceRoll)

  loadJSON("/getMyPos/" + playerId, (response) => {

    player_posX = response[0].pos_x;
    player_posY = response[0].pos_y;

    let x = response[0].pos_x
    let y = response[0].pos_y

    for (k = 0; k < diceRoll; k++) {

      //linha 4
      if (player_posX == 0 && player_posY > 0) {
        y--
        player_posY = y
        console.log("posição do jogador: x=" + player_posX + ", y=" + player_posY)
      }

      //linha 3
      if (player_posY == tiles_num - 1 && player_posX > 0) {
        x--
        player_posX = x
        console.log("posição do jogador: x=" + player_posX + ", y=" + player_posY)
      }

      //linha 2
      if (player_posX == tiles_num - 1 && player_posY < tiles_num - 1) {
        y++
        player_posY = y
        console.log("posição do jogador: x=" + player_posX + ", y=" + player_posY)
      }

      //linha 1
      if (player_posX >= 0 && player_posY == 0) {
        x++
        player_posX = x
        console.log("posição do jogador: x=" + player_posX + ", y=" + player_posY)
      }
      changeTurn(playerId)
      updateBoard(player_posX, player_posY);
    }

  })
}

function updateBoard(player_posX, player_posY) {

  let data = {
    "playerId": playerId,
    "pos_x": player_posX,
    "pos_y": player_posY
  }

  httpPost("/updatePlayerPos", "json", data, (response) => {

    createBoard();
  });
}