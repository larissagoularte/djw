const express = require('express')
const mysql = require('mysql')
const env = require('dotenv').config()
const app = express()
const port = 3000

app.use(express.static('public/p5sketch'))
  
app.listen(port, () => {
  console.log(`Servidor a rodar em localhost:${port}`)
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'teicoverdb'
});

connection.connect((error) => {
  if(error){
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});
connection.end((error) => {
});