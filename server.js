const express = require('express')
const mysql = require('mysql')
var bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(express.static('public/p5sketch'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'teicoverdb',
  port: '3306'
});

connection.connect((error) => {
  if (error) {
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});


//metodos GRUD

//Login
app.post("/login", (req, res) => {

  let username = req.body.username;
  let password = req.body.password;

  let sql = "SELECT * FROM user WHERE username='" + username + "' AND userpassword = '" + password + "';"

  connection.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);

  });
});

//Register
app.post("/register", (req, res) => {
 
  let username = req.body.username;
  let password = req.body.password;

  /*
  let selectAllUsers = "SELECT * FROM user;"
  connection.query(selectAllUsers, (err, res) => {
    if (err){
      console.log(err)
    }

  })
  */
 
  let sql = "SELECT username FROM user WHERE username='" + username + "';"

  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({ "ack": 0 });
    } else {

      let sql = "INSERT INTO user (`username`,`userpassword`) VALUES ('" + username + "','" + password + "');";

      connection.query(sql, (err, result) => {
        if (err) throw err;

        let sql = "SELECT username FROM user WHERE username='" + username + "' and userpassword='" + password + "';";


        connection.query(sql, (err, result) => {
          if (err) throw err;
          let user_id = result[0].nome;

          let sql = "INSERT INTO user (`nome`,`pos_x`,`pos_y`) VALUES ('" + user_id + "','" + 0 + "','" + 0 + "');";

          connection.query(sql, (err, result) => {
            if (err) throw err;

            res.send([{ "PlayerId": user_id }]);

          });

        });

      });
    }
  });
});

//atualizar propriedades

app.post("/atualizarTurno", (req, res) =>{

  let sql = "UPDATE tabuleiro SET turn '"+req.body.turn+" "
})

app.post("/updatePlayerPos",(req,res)=>{

  let sql = "UPDATE tabuleiro SET PlayerPos='"+req.body.position+"' WHERE PlayerId='"+req.body.playerId+"';";

        dbase.query(sql, (err,result)=>{
        if(err) throw err;

        res.send(result);

    });


});

app.listen(port, () => {
  console.log(`Servidor a rodar em localhost:${port}`)
})
