class Jogador{

    constructor(x, y, pos_x, pos_y, cor, nome, dinheiro, carisma,plyFlag ){
        this.x=x,
        this.y=y,
        this.pos_x=pos_x, 
        this.pos_y=pos_y,  
        this.cor=cor,
        this.nome=nome, 
        this.dinheiro=dinheiro, 
        this.carisma=carisma, 
        this.plyFlag=plyFlag
    }

    draw_player(){
        push()
        fill(this.cor)
        circle(this.pos_x+(tile_size_x*0.5), this.pos_y+(tile_size_y*0.5), tile_size_x*0.8)
        pop()
    }

    display_player_status(){
        tagnome.html("nome: "+this.nome)
        tagcarisma.html("carisma: "+this.carisma)
    }
}

function drawBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].draw_tile();
      }
    }
  }

let x=0
let y=0
function update_player_pos(diceRoll){
    for (k = 0; k < diceRoll; k++) {
       
        //linha 4
        if (player.x==0 && player.y > 0){
            y--
            player.y=y
            player.pos_y = board[x][y].pos_y
            console.log("player.x= "+player.x+"\nplayer.y= "+player.y+"\nplayer.pos_x: "+player.pos_x+"\nplayer.pos_y: "+player.pos_y)
        }

        //linha 3
        if (player.y == tiles_num-1 && player.x > 0){
            x--
            player.x=x
            player.pos_x = board[x][y].pos_x
            console.log("player.x= "+player.x+"\nplayer.y= "+player.y+"\nplayer.pos_x: "+player.pos_x+"\nplayer.pos_y: "+player.pos_y)
        }

        //linha 2
        if (player.x==tiles_num-1 && player.y < tiles_num-1){
            y++
            player.y=y
            player.pos_y = board[x][y].pos_y
            console.log("player.x= "+player.x+"\nplayer.y= "+player.y+"\nplayer.pos_x: "+player.pos_x+"\nplayer.pos_y: "+player.pos_y)

        }
        
        //linha 1
        if (player.x >= 0 && player.y == 0){
            x++ 
            player.x=x
            player.pos_x = board[x][y].pos_x
            console.log("player.x= "+player.x+"\nplayer.y= "+player.y+"\nplayer.pos_x: "+player.pos_x+"\nplayer.pos_y: "+player.pos_y)
        }

        //atualizar turno
        if (player.x == 0 && player.y == 1){

            if (scene==0){
                document.getElementById("dinheiro").style.display = "none";
                document.getElementById("nome").style.display = "none";
                document.getElementById("carisma").style.display = "none";
                document.getElementById("turno").style.display = "none";
            }
            
            if(scene==1){
                tabuleito.turn+=1
            update_turn="UPDATE tabuleiro SET turn='"+tabuleito.turn+"'"   
            
            tabuleito.turn_counter()
            player.dinheiro+=500

            tagdinheiro.html("Dinhero: "+player.dinheiro+"€$")
            tagturno.html("turn: "+tabuleito.turn)
            }
        }
        
    }    
}

//player = new Jogador(0, 0, board[0][0].pos_x, board[0][0].pos_y, arr_cores[index_cor], "nome do bicho", 5000, 20)
function novoJogador(username){
    this.nome=username
    this.x=0,
    this.y=0,
    this.pos_x=pos_x=0, 
    this.pos_y=pos_y=0
    this.money=5000,
    this.carisma
}

function jogadorExistente(){

}