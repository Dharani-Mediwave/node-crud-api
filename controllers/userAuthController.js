const Signup = require('../models/signupModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    console.log('**** signup data ****', data);
    //saving the user
    const user = await Signup.create(data);
    console.log("******** user data *****", JSON.stringify(user, null, 5));
    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log("<<<<<< token :>>>>>", token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log('***** Auth controller ****', error);
  }
};

module.exports = {
  signup
};