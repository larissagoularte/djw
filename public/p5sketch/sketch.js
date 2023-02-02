const canvas_width = 900
const canvas_height = 900
const tiles_num = 9
let tile_size_x = canvas_width / tiles_num
let tile_size_y = canvas_height / tiles_num

let tagdinheiro;
let tagnome;
let tagcarisma;
let tagturno;
let scene = 1

//info do jogador logado
var playerId
var playerName
var playerDinheiro
var playerCarisma
var player_posX
var player_posY

function login() {

  let usernameValue = document.getElementById("usernameLogin").value
  let passwordValue = document.getElementById("passwordLogin").value

  let data = {

    "username": usernameValue,
    "password": passwordValue
  }


  httpPost('/login', 'json', data, (response) => {

    if (response.length > 0) {
      
      playerId = response[0].user_id;
      playerName = response[0].username
      playerDinheiro = response[0].dinheiro
      playerCarisma = response[0].carisma
      player_posX = response[0].pos_x
      player_posY = response[0].pos_y
      display_player_status(playerName,playerDinheiro, playerCarisma)

      apagarAllScenes()
      removeElements();

      scene = 0;
      createBoard()
      loop()
    } else {
      alert("autenticação errada");
    }

  })
}

function register() {

  let usernameValue = document.getElementById("usernameRegister").value
  let passwordValue = document.getElementById("passwordRegister").value
  
  let data = {

    "username": usernameValue,
    "password": passwordValue
  }

  httpPost('/register', 'json', data, (response) => {

    if (response.length > 0) {
      alert("Registado com sucesso")

      console.log("resposta " + response.username);
      playerId = response[0].user_id;
      playerName = response[0].username
      playerDinheiro = response[0].dinheiro
      playerCarisma = response[0].carisma
      player_posX = response[0].pos_x
      player_posY = response[0].pos_y
      display_player_status(playerName, playerDinheiro, playerCarisma)

      apagarAllScenes()
      removeElements();
      scene = 0;

      createBoard()
      loop()
    } else {
      alert("Utilizador Já Existe!");
    }

  });
}

function preload() {
  img_board = loadImage("assets/boardCompleta.jfif")
  img_pinPizza = loadImage("assets/pizza.png")
  img_pinMoon = loadImage("/assets/moon.png")
  img_pintMushroom = loadImage("/assets/rainbow.png")
  img_pinStar = loadImage("assets/star.png")
  img_pinSmiley = loadImage("assets/smiley.png")
  img_logo = loadImage("assets/loggo.png")
  img_btn_registo = loadImage("assets/registo.png")
  img_btn_login = loadImage("assets/login.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(1)
}

function draw() {

  if (scene == 0)
    gameScene()
  if (scene == 1)
    startScene()
  if (scene == 2)
    loginScene()
  if (scene == 3)
    registerScene()
  
}

function gameScene() {

  removeElements();
  
  background('#bed9e7')
  drawBoard()
  image(img_board, 0, 0, canvas_width, canvas_height)

  createBoard()
  document.getElementById("status_display").style.display = "inline"


  let diceBtn = createButton("roda o dado!");
  diceBtn.position(canvas_width * 0.5, 0);
  diceBtn.mousePressed(rollDice)

}


function startScene() {
  //botão login
  let buttonlogin = select("#imgLogin")
  buttonlogin.mousePressed(loginScene)

  //botão register 
  let buttonRegister = select("#imgRegister")
  buttonRegister.mousePressed(registerScene);
}

function loginScene() {
  apagarStartScene()
  noLoop()
  document.getElementById("divLogin").style.display = "block"

  submitBtn = createButton('Login User');
  submitBtn.position(windowWidth*0.5-50, windowHeight*0.5);
  submitBtn.mousePressed(login);
}

function registerScene() {
  apagarStartScene()
  document.getElementById("divRegisto").style.display="block"

  registerUser = createButton("registar");
  registerUser.position(windowWidth*0.5-50, windowHeight*0.5);
  registerUser.mousePressed(register)
}
