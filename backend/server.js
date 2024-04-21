const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware



app.listen(8081, () => {
  console.log("Listening...");
});
