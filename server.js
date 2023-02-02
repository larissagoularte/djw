const express = require('express')
const mysql = require('mysql')
var bodyParser = require('body-parser');
const app = express()
const port = 3000
const bcrypt = require("bcrypt")

app.use(express.static('public/p5sketch'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'teicoverdb'
});

dbConn.connect((error) => {
  if (error) {
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});


//registar 
app.post("/register", (req, res) => {

  let username = req.body.username;
  let password = req.body.password;

  let sql = "SELECT username FROM User WHERE username='" + username + "';"

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({ "ack": 0 });
    } else {

      let sql = "INSERT INTO user (username,userpassword, dinheiro, carisma) VALUES ('" + username + "','" + password + "'," + 5000 + "," + 20 + ");"

      dbConn.query(sql, (err, result) => {
        if (err) throw err;

        let sql = "SELECT user_id FROM user WHERE username='" + username + "' and userpassword='" + password + "';";

        dbConn.query(sql, (err, result) => {
          if (err) throw err;
          id = result[0].user_id;

          let sql = "INSERT INTO tabuleiro (pos_x, pos_y, turn) VALUES (" + 0 + "," + 0 + ","+0+");";

          dbConn.query(sql, (err, result) => {
            if (err) throw err;

            res.send(result);

          });
        });
      });
    }
  });
});

//Login
app.post("/login", (req, res) => {

  let username = req.body.username;
  let password = req.body.password;

  let sql = "SELECT * FROM user WHERE username='" + username + "' AND userpassword = '" + password + "';"

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

//vai buscar as posições do jogador a base de dados
app.get("/getPlayersPosition/", (req, res) => {

  let sql = "SELECT * FROM tabuleiro ;";

  dbConn.query(sql, (err, result) => {

    if (err) throw err;

    res.send(result);

  });
});

app.listen(port, () => {
  console.log(`Servidor a rodar em localhost:${port}`)
})

//atualizar posiçoes do jogador
app.post("/updatePlayerPos", (req, res) => {

  let sql = "UPDATE tabuleiro SET pos_x=" + req.body.pos_x + ",pos_y="+ req.body.pos_y +" WHERE user_id=" + req.body.playerId + ";";

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

//pos de um player em especifico
app.get("/getMyPos/:playerId",(req,res)=>{
     
  let playerId= req.params.playerId;

    let sql = "SELECT pos_x, pos_y FROM tabuleiro Where user_id='"+playerId+"';";

    dbConn.query(sql, (err,result)=>{
      if(err) throw err;

      res.send(result);

      });

  });

