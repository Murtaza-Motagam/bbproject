var express = require('express');
var router = express.Router();
const Blogs = require('../model/Blogs')
const fetchUser = require('../middlewares/fetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AuthenticateUser";


// Route-1: Creating a user's blog

router.post('/create', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('category').isLength({ min: 5 }),
    body('blogUser', 'Enter a valid username').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 10 }),
], async (req, res) => {

    let success = false;

    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {

        const { title, category, blogUser, description } = req.body;

        // Check if title already exist or not

        const findTitle = await Blogs.findOne({ title: title });

        if (findTitle) {
            res.json({ success, "Message": "Sorry a title with this name already exist try to add a unique one" });
        }
        else {


            const blogs = new Blogs({
                user: req.user.id,
                title,
                category,
                blogUser,
                description
            })

            const UserBlog = await blogs.save();

            success = true;

            res.json({ success, UserBlog });

        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error is Occurred..");
    }
})

// Route-2: Fetch all blogs from database for explore page


router.get('/fetchallblogs', async (req, res) => {

    let success = false;
    
    try {
        const blogs = await Blogs.find({ });
        success = true;
        res.json(blogs);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})

// Route-3: Get Only User Personal Blogs using : GET "api/blogs/fetchuserblogs". Login Required..

router.get('/fetchuserblogs', fetchUser, async (req, res)=>{

    let success = false;

    try {
        const blogs = await Blogs.find({ user: req.user.id });

        success = true;

        res.json(blogs)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
});

// ROUTE 4: Fetch blogs According to category.

router.get('/fetchbycategory/:category',  async (req, res) => {

    let success = false;
    
    try {
        const blogs = await Blogs.find({ category: req.params.category });
        success = true;
        res.json({success, blogs});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})



module.exports = router;