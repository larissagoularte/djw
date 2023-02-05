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
  database: 'teicoverdb',
  multipleStatements: true
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

  let sql = "SELECT username FROM user WHERE username='" + username + "';"

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({ "ack": 0 });
    }
    else {

      let sql = "SELECT * FROM user;"

      dbConn.query(sql, (err, result) => {
        if (err) throw err;

        if (result.length == 1) {
          let sql = "INSERT INTO user (username,userpassword, dinheiro, carisma, turn) VALUES ('" + username + "','" + password + "'," + 5000 + "," + 20 + ", " + 1 + ");"

          dbConn.query(sql, (err, result) => {
            if (err) throw err;

            let sql = "SELECT user_id FROM user WHERE username='" + username + "' and userpassword='" + password + "';";

            dbConn.query(sql, (err, result) => {
              if (err) throw err;

              let sql = "INSERT INTO tabuleiro (pos_x, pos_y) VALUES (" + 0 + "," + 0 + ");";

              dbConn.query(sql, (err, result) => {
                if (err) throw err;

                res.send(result);

              });
            });
          });
        }

        if (result.length >= 4) {
          console.log("já estão registados o número máximo de jogados")
          res.send({ "ack": 0 });
        }

        else {
          let sql = "INSERT INTO user (username,userpassword, dinheiro, carisma, turn) VALUES ('" + username + "','" + password + "'," + 5000 + "," + 20 + ", " + 0 + ");"

          dbConn.query(sql, (err, result) => {
            if (err) throw err;

            let sql = "SELECT user_id FROM user WHERE username='" + username + "' and userpassword='" + password + "';";

            dbConn.query(sql, (err, result) => {
              if (err) throw err;

              let sql = "INSERT INTO tabuleiro (pos_x, pos_y) VALUES (" + 0 + "," + 0 + ");";

              dbConn.query(sql, (err, result) => {
                if (err) throw err;

                res.send(result);

              });
            });
          });
        }
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

  let sql = "UPDATE tabuleiro SET pos_x=" + req.body.pos_x + ",pos_y=" + req.body.pos_y + " WHERE user_id=" + req.body.playerId + ";";

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

//pos de um player em especifico
app.get("/getMyPos/:playerId", (req, res) => {

  let playerId = req.params.playerId;

  let sql = "SELECT pos_x, pos_y FROM tabuleiro Where user_id='" + playerId + "';";

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

app.get("/getPlayersData/", (req, res) => {

  let sql = "SELECT * FROM user ;";

  dbConn.query(sql, (err, result) => {

    if (err) throw err;

    res.send(result);

  });
});

//checkar o turno de todos os jogadores
app.get("/checkTurn/", (req, res) => {


  let sql = "SELECT user_id, username, turn FROM user ;";

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

//alterar a flag do turno de um jogador de 0 para 1
app.post("/setTurn0/", (req, res) => {

  //let next_player = req.body.next_player;
  let current_player = req.body.current_player;

  let sql = "UPDATE user SET turn = 0 WHERE user_id= " + current_player + ";"

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result)
  })
})

//alterar a flag de um jogador de 1 para 0
app.post("/setTurn1/", (req, res) => {

  let next_player = req.body.next_player;

  let sql = "UPDATE user SET turn = 1 WHERE user_id= " + next_player + ";"

  dbConn.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result)
  })
})