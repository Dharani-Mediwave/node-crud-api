const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = require("../configs/database");

// login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await client.query("SELECT * FROM register WHERE email=$1;", [
      email,
    ]);
    const userData = data.rows;
    console.log("login arr :>>", userData);
    if (userData.length === 0) {
      return res.status(400).json({
        error: "You are not register, Please sign up!",
      });
    } else {
      console.log("Sign in");
      const resp = await bcrypt.compare(password, userData[0].password);
      console.log("login result :>>", resp);
      if (!resp) {
        return res.status(400).json({
          error: "Enter correct password!",
        });
      } else {
        console.log("Let generate jwt token !!", email, process.env.SECRET_KEY);
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        return res.status(201).json({
          message: "Successfully, Sign in!",
          token,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      error: "Database error occurred while signing in!",
    });
  }
};
