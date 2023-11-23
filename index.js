const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const client = require("./configs/database");

const user = require("./routes/users");
// const { sendMail } = require("./helper/sendMail");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3080;
// Database connection
client.connect((err) => {
  if (err) {
    return console.log("connection error :>>>", err);
  } else {
    console.log("Database connected successfully!");
  }
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "The express server working" });
});

// sendMail();
app.use("/user", user); //Route for /user endpoint of API

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
