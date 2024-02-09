var express = require('express');
var router = express.Router();
const Admin = require('../model/Admin')
const fetchAdmin =  require("../middlewares/fetchAdmin.js");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AuthenticateAdmin";
const multer = require('multer');
const path = require('path');


// Route-1: Signup the user using post request

router.post('/signup', [
    body('adminId', 'Please Enter valid Id').isLength({ min: 5 }),
    body('username', 'Please Enter valid Username').isLength({ min: 5 }),
    body('name', 'Please Enter your fullname').isLength({ min: 5 }),
    body('emailId', 'Please enter valid email address').isEmail(),
    body('phoneNumber', 'Please enter valid phone number').isLength({ min: 10 }),
    body('adminPriority', 'Please enter valid admin priority').isLength({ min: 6 }),
    body('password', 'Please enter long password').isLength({ min: 8 }),
], async (req, res) => {


    let success = false;

    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }


    try {

        const { username, adminId, name, emailId, phoneNumber, adminPriority, password, cpassword } = req.body;

        let admin = await Admin.findOne({ adminId: adminId });
        let adminUser = await Admin.findOne({ username: username });
        let email = await Admin.findOne({ emailId: emailId });
        let phone = await Admin.findOne({ phoneNumber: phoneNumber });

        if (adminUser) {
            return res.status(400).json({ success, error: "Sorry an admin with this name already exists try using different one." });
        }
        else if (email) {
            return res.status(400).json({ success, error: "Sorry an email with this name already exists try using different one." });
        }
        else if (admin) {
            return res.status(400).json({ success, error: "Sorry an id with this number already exists try using different one." });
        }
        else if (phone) {
            return res.status(400).json({ success, error: "Sorry a phone number with a username already exists try using different one." });
        }

        if (password === cpassword) {
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(cpassword, salt);


            user = await Admin.create({
                adminId: adminId,
                username: username,
                name: name,
                emailId: emailId,
                phoneNumber: phoneNumber,
                adminPriority: adminPriority,
                password: secPass
            });

            let data = {
                user: {
                    id: user.id
                }
            }

            let adminToken = jwt.sign(data, JWT_SECRET);
            success = true

            res.status(200).json({ success, adminToken, "Admin-Details": user });

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
    body('username', 'Please enter valid username').isLength({ min: 7 }),
    body('password', 'Please enter long password').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;

    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        const { username, password } = req.body;

        let user = await Admin.findOne({ username });

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

            const adminToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.status(200).json({ success, adminToken, "admin-details": user });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occurred..");
    }
});

// Route-3: Fetch admin entire info from db 

router.post('/getadmin', fetchAdmin, async (req, res) => {

    try {

        let userId = req.user.id;
        const userInfo = await Admin.findById(userId).select("-password");
        res.json([userInfo]);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route-4: Fetch all Admin-users detail 

router.get('/fetchalladmins', async (req, res) => {

    let success = false;
    
    try {
        const admins = await Admin.find({ });
        success = true;
        res.json(admins);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})


module.exports = router;