const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/database");
const saltRounds = 10;

// Registration Function
exports.register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  let isRegistered = 1;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = {
      name,
      email,
      phonenumber,
      password: passwordHash,
    };
    //Checking if user already exists
    const data = await client.query(
      "SELECT * FROM register WHERE email = $1;",
      [email]
    );
    const arr = data.rows;

    if (arr.length !== 0) {
      isRegistered = 0;
      return res.status(400).json({ error: "Email already register." });
    } else {
      console.log("user log :>>>>", user);
      console.log("resp isRegistered 46 :>>>", isRegistered);

      await client.query(
        `INSERT INTO register (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
        [user.name, user.email, user.phonenumber, user.password],
        (err, result) => {
          if (err) {
            console.log("Insertion err :>>", err);
            isRegistered = 0;
            return res.status(500).json({
              error: "Database error",
            });
          } else {
            isRegistered = 1;
            res
              .status(200)
              .send({ message: "Successfully, register the user" });
          }
        }
      );
      console.log("resp isRegistered 53 :>>>", isRegistered);
      //if user details is captured
      //generate token with the user's email and the secretKey in the env file
      if (isRegistered) {
        console.log(
          "Let generate jwt token !!",
          user.email,
          process.env.SECRET_KEY
        );
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
          },
          process.env.SECRET_KEY
        );
        console.log("<<<<<<< token created >>>>>>>>>>");
      } else {
        console.log("Let start no jwt !!!!!!!!!!!!!!!");
      }
    }
  } catch (error) {
    return res.status(400).json({
      error: "Database error occurred while register",
    });
  }
};
