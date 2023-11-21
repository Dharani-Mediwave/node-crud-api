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
  res.status(200).send("Hello World!!");
});

app.use("/user", user); //Route for /user endpoint of API

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

// client.connect((err) => {
//   if (err) {
//     return console.log('Error acquiring client', err)
//   } else {
//     console.log('Database connected successfully!');
//   }
// });
