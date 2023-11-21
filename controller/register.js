const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/database");
const saltRounds = 10;

// Registration Function
exports.register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  console.log("register controller :>>", req.body);
  try {
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        console.log("Salt: ", salt);
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        console.log("Hash: ", hash);
        const user = {
          name,
          email,
          phonenumber,
          password: hash,
        };
        console.log("user log :>>>>", user);
        // INSERT INTO sign_up (name, email, phonenumber, password) values ('niki', 'test@gmail.com', '9876543213','test@123');
        client.query(
          `INSERT INTO sign_up (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phonenumber, user.password],
          (err, result) => {
            console.log("result :>>>>>", result);
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
      })
      .catch((err) => console.error(err.message));
  } catch (error) {
    console.log("reg err :>>>", err);
  }
};
