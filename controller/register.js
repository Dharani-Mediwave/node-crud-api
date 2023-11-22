const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/database");
const saltRounds = 10;

// Registration Function
exports.register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  // console.log("register controller :>>", req.body);
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = {
    name,
    email,
    phonenumber,
    password: passwordHash,
  };
  // console.log("user log :>>>>", user);
  await client.query(
    `INSERT INTO register (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
    [user.name, user.email, user.phonenumber, user.password],
    (err, result) => {
      if (err) {
        console.log("Insertion err :>>", err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        res.status(200).send({ message: "User added to database" });
      }
    }
  );
};
