
//importing modules
const Signup = require('../models/signupModal');

const saveUser = async (req, res, next) => {
  try {
    const username = await Signup.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.json(409).send("Authentication failed");
    }
    next();
  } catch (error) {
    console.log('***** Auth middleware error ****', error);
  }
};

//exporting module
module.exports = {
  saveUser,
};
