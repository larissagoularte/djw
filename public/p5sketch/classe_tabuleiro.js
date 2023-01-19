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

function rollDice() {
    diceRoll = int(random(1, 7));
    console.log(diceRoll)
    update_player_pos(diceRoll)
}

class Tabuleiro{

    constructor(turn){
        this.turn=turn
    }

    turn_counter(){
        text("turno: "+this.turn, 0, 800)

    }
}

function statusDisplay(){
    document.getElementById("dinheiro").style.display = "inline";
    document.getElementById("nome").style.display = "inline";
    document.getElementById("carisma").style.display = "inline";
    document.getElementById("turno").style.display = "inline";
}