const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const db = require("./database.js");
const { request, query } = require("express");

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
};

app.use(cors(corsOptions));
app.use(express.json()); // to access the request body

app.get("/todos", (req, res) => {
  let query = "SELECT * FROM todo";
  db.query(query, (err, data) => {
    if (data) res.status(200).send(data);
    else {
      res.status(404).send("error");
    }
  });
});

app.post("/todos", (req, res) => {
  let query = `INSERT INTO todo (content) VALUES("${req.body.content}")`;
  db.query(query, (err, data) => {
    console.log("data,", data);
    res.send({
      smg: "Successfully inserted into db",
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  let query = `DELETE FROM todo WHERE id =${req.params.id}`;
  db.query(query, (err, data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`example app is listening on port ${port}`);
});
