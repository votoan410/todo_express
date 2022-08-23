const mysql = require("mysql2");
const dotenv = require("dotenv");

console.log("process running ...");
const todoDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todoApp",
});

todoDB.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("connection sucess");
});

module.exports = todoDB;
