const canvas_width = 900
const canvas_height = 900
const tiles_num = 9
let tile_size_x = canvas_width / tiles_num
let tile_size_y = canvas_height / tiles_num
let arr_cores = ['red', 'blue', 'green', 'orange', 'purple']

let tagdinheiro;
let tagnome;
let tagcarisma;
let tagturno;
let scene = 0

function preload() {
  img_board = loadImage("assets/boardCompleta.jfif")
}

function setup() {
  createCanvas(windowWidth, canvas_height)
  createInputs()

  let index_cor = int(random(0, 5))
  player = new Jogador(0, 0, board[0][0].pos_x, board[0][0].pos_y, arr_cores[index_cor], "nome do bicho", 5000, 20)
  tabuleito = new Tabuleiro(1)

  tagdinheiro = select("#dinheiro");
  tagnome = select("#nome")
  tagcarisma = select("#carisma")
  tagturno = select("#turno")

  tagdinheiro.html("Dinhero: " + player.dinheiro + "€$")
  tagturno.html("turn: " + tabuleito.turn)
}

function draw() {
  
  //Scene de login 
  if (scene == 0) {

    submitBtn = createButton('Login User');
    submitBtn.position(250, 100);
    submitBtn.mousePressed(login);

    registerUser = createButton('Register User');
    registerUser.position(250, 50)
    registerUser.mousePressed(register);

    document.getElementById("status_display").style.display="none"
  }

  //Scene do jogo
  if (scene == 1) {

    removeElements();

    background(255)
    drawBoard()
    image(img_board, 0, 0, canvas_width, canvas_height)

    document.getElementById("status_display").style.display="inline"

    player.draw_player()
    player.display_player_status()
    tabuleito.turn_counter()
    let diceBtn = createButton("roda o dado!");
    diceBtn.position(canvas_width * 0.5, 0);
    diceBtn.mousePressed(rollDice)

  }
}

function createInputs() {

  username = createInput('');
  textSize(20)
  text("UserName", 50, 50);
  username.position(50, 50);

  password = createInput('');
  textSize(20)
  text("Password", 50, 100);
  password.position(50, 100);
}