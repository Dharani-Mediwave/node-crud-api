const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const client = require("./configs/database");

const user = require("./routes/users");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "The express server working" });
});

app.use("/user", user); //Route for /user endpoint of API

// Database connection
client.connect((err) => {
  if (err) {
    return console.log("connection error :>>>", err);
  } else {
    console.log("Database connected successfully!");
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
