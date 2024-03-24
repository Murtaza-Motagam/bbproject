var express = require('express');
var router = express.Router();
const Users = require('../model/Users')
const Blogs = require('../model/Blogs')
const fetchUser = require('../middlewares/fetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AuthenticateUser";
const multer = require('multer');
const path = require('path');


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
        password: secPass,
        followers: [],
        following: [],
        link: "",
        location: "",
        desc: ""
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

router.get('/getuser', fetchUser, async (req, res) => {

  let success = false;
  try {

    let userId = req.user.id;
    const userInfo = await Users.findById(userId).select("-password");
    success = true;
    res.json({ success, userInfo: userInfo });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

// Route-4 - Fetch all user information

router.get('/fetchallusers', fetchUser, async (req, res) => {

  let success = false;

  try {

      const fetchAllUsers = await Users.find({})

      success = true;
      res.status(200).json({ success, fetchAllUsers })


  }
  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

//Route-6: Recover forgotten password

router.post('/forgotpassword/verifyemail', async (req, res) => {

  let success = false;

  try {

    const { emailId } = req.body;

    const email = await Users.findOne({ emailId });

    if (!email) {
      success = false;
      res.status(404).json({ success, error: "Credentials Does not match " })
    }
    else {
      success = true;
      res.status(200).json({ success, email })
    }

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// Route-7: Change password of user

router.post('/changepassword', async (req, res) => {

  let success = false;

  try {

    const { emailId, password } = req.body;

    const updatePassword = await Users.findOne({ emailId });

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt)

    // Update the password
    updatePassword.password = secPass;

    // Save the updated user
    await updatePassword.save();


    success = true;

    res.status(200).json({ success, message: "Password Changed Successfully" })
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

// Multer Object declaration 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads')); // Specify absolute path to the public folder
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
});

const upload = multer({ storage })

//multer function for storing image in database
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ "success": "image is inserted" });
});

// ROUTE 8: Delete a user Login Required...

router.delete('/deleteuser/:id', fetchUser, async (req, res) => {

  let success = false;

  try {

    // Find note to be updated and update it

    let mainUser = await Users.findById(req.params.id);
    if (!mainUser) {
      return res.status(404).send("User Not Found");
    }

    mainUser = await Users.findByIdAndDelete(req.params.id);

    success = true;

    res.json({ success, "Success": "The User is deleted Successfully", mainUser: mainUser });
  }

  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }

})


// ROUTE 9: Add other information such as location, website link or personal description

router.post('/addfellowdetails', fetchUser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, link, desc } = req.body;
    const userId = req.user.id;

    const updateFields = {};
    if (location !== undefined) updateFields.location = location;
    if (link !== undefined) updateFields.link = link;
    if (desc !== undefined) updateFields.desc = desc;

    const updatedUser = await Users.findByIdAndUpdate(userId, updateFields, { new: true });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});



module.exports = router;
