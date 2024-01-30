var express = require('express');
var router = express.Router();
const Users = require('../model/Users')
const fetchUser = require('../middlewares/fetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AuthenticateUser";

// Route-1: Signup the user using post request

router.post('/signup', [
  body('username', 'Please Enter valid Username').isLength({ min: 5 }),
  body('emailId', 'Please enter valid email address').isEmail(),
  body('password', 'Please enter long password').isLength({ min: 8 }),
], async (req, res) => {


  let success = false;

  // If there are errors, return bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() })
  }


  try {

    const { username, emailId, password, cpassword } = req.body;

    let user = await Users.findOne({ username: username });
    let email = await Users.findOne({ emailId: emailId });

    if (user) {
      return res.status(400).json({ success, error: "Sorry a username with this name already exists try using different one." });
    }
    else if (email) {
      return res.status(400).json({ success, error: "Sorry an email with this name already exists try using different one." });
    }

    if (password === cpassword) {
      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(cpassword, salt);


      user = await Users.create({
        username: username,
        emailId: emailId,
        password: secPass
      });

      let data = {
        user: {
          id: user.id
        }
      }

      let authtoken = jwt.sign(data, JWT_SECRET);
      success = true

      res.status(200).json({ success, authtoken, "User-Details": user });

    }
    else {
      res.status(400).json({ success, "Message": "Sorry both password doesn't match" })
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error is Occurred..");
  }
})

// Route-2: Login the user by checking its profile within the database using post request

router.post('/signin', [
  body('emailId', 'Please enter valid email address'),
  body('password', 'Please enter long password').isLength({ min: 8 }),
], async (req, res) => {
  let success = false;

  // If there are errors, return bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() })
  }

  try {
    const { emailId, password } = req.body;

    let user = await Users.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ success, Message: "Sorry, try to login using proper credentials." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(404).json({ Message: "Please try to login with proper credentials" });
    } 
    else {
      const data = {
        user: {
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).json({ success, authtoken, "User-details": user });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error is Occurred..");
  }
});


// Route-3: Fetch User entire info in database except blogs 

router.post('/getuser', fetchUser, async (req, res) => {

  try {

    let userId = req.user.id;
    const userInfo = await Users.findById(userId).select("-password");
    res.json([userInfo]);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router;
