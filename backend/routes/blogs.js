var express = require('express');
var router = express.Router();
const Blogs = require('../model/Blogs')
const Users = require('../model/Users')
const moment = require('moment')
const fetchUser = require('../middlewares/fetchUser')
const fetchAdmin = require('../middlewares/fetchAdmin')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AuthenticateUser";

// Route-1: Creating a user's blog

router.post('/create', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('category').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 10 }),
], async (req, res) => {

    let success = false;

    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {

        const { title, category, description } = req.body;

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
                description,
                likes: [],
                active: true,
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
        const blogs = await Blogs.find({});
        const blogsWithUsernames = await Promise.all(blogs.map(async (blog) => {
            const user = await Users.findById(blog.user);
            return {
                ...blog.toJSON(),
                username: user.username
            };
        }));
        res.json(blogsWithUsernames);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})

// Route-3: Get Only User Personal Blogs using : GET "api/blogs/fetchuserblogs". Login Required..

router.get('/fetchuserblogs', fetchUser, async (req, res) => {

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

router.get('/fetchbycategory/:category', async (req, res) => {

    let success = false;

    try {
        const blogs = await Blogs.find({ category: req.params.category });
        const blogsWithUsernames = await Promise.all(blogs.map(async (blog) => {
            const user = await Users.findById(blog.user);
            return {
                ...blog.toJSON(),
                username: user.username
            };
        }));
        success = true;
        res.json({ success, blogsWithUsernames });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})

// ROUTE 5: Fetch single blog by id.

router.get('/getblog/:id', async (req, res) => {

    let success = false;

    try {
        const blogs = await Blogs.findById(req.params.id);
        if (!blogs) {
            res.status(404).json({ success, message: "Blog Not Found!" })
        }
        else {
            success = true;
            res.status(200).json({ success, blogs });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
})


// Route-6: LIKE POST 
router.put('/like/:postId', fetchUser, async (req, res) => {
    try {

        const user = await Users.findById(req.user.id);
        const newLike = new Like({
            user: req.User._id,
            post: req.params.postId
        });

        const savedLike = await newLike.save();
        res.json(savedLike);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route-7: UNLIKE POST
router.put('unlike/:postId', async (req, res) => {
    try {
        const deletedUnlike = await Unlike.deleteOne({
            user: req.user._id,
            post: req.params.postId
        });

        res.json(deletedUnlike);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route-8: Fetch user blog by id

router.get('/fetchbyid/:id', fetchAdmin, async (req, res) => {

    let success = false;

    try {
        const blogs = await Blogs.find({ user: req.params.id });

        success = true;

        res.json(blogs)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
});

// Route-9: Delete a blog by id

router.delete('/delete/:id', fetchAdmin, async (req, res) => {

    let success = false;

    try {
        const blogs = await Blogs.findByIdAndDelete({ _id: req.params.id });

        if (blogs) {
            success = true;
            res.status(200).json({ message: "Blog Deleted Successfully" });
        }
        else {
            res.status(404).json({ message: "Could not find the blog!" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Some error occurred");
    }
});

// ROUTE 10: Like  user blogs. 

router.post('/like/:id', fetchUser, async (req, res) => {
    let success = false;
    try {
        const mainBlog = await Blogs.findById(req.params.id);
        if (!mainBlog) {
            return res.status(404).json({ success, message: "Blog Not Found" });
        }

        if (mainBlog.likes.includes(req.user.id)) {
            mainBlog.likes.pull(req.user.id);
            const updatedBlog = await mainBlog.save();
            if (updatedBlog) {
                success = true;
                return res.status(200).json({ success, message: "You unliked the blog" });
            }
            else {
                return res.status(422).json({ success, message: "Something went wrong" });
            }
        }
        else {

            mainBlog.likes.push(req.user.id);
            const updatedBlog = await mainBlog.save();
            success = true;

            if (updatedBlog) {
                return res.status(200).json({ success, message: "You liked the blog" });
            }
            else {
                return res.status(422).json({ success, message: "Something went wrong" });
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Like for admin

router.post('/admin-like/:id', fetchAdmin, async (req, res) => {
    let success = false;
    try {
        const mainBlog = await Blogs.findById(req.params.id);
        if (!mainBlog) {
            return res.status(404).json({ success, message: "Blog Not Found" });
        }

        if (mainBlog.likes.includes(req.user.id)) {
            mainBlog.likes.pull(req.user.id);
            const updatedBlog = await mainBlog.save();
            if (updatedBlog) {
                success = true;
                return res.status(200).json({ success, message: "You unliked the blog" });
            }
            else {
                return res.status(422).json({ success, message: "Something went wrong" });
            }
        }
        else {

            mainBlog.likes.push(req.user.id);
            const updatedBlog = await mainBlog.save();
            success = true;

            if (updatedBlog) {
                return res.status(200).json({ success, message: "You liked the blog" });
            }
            else {
                return res.status(422).json({ success, message: "Something went wrong" });
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// ROUTE 11:  unlike  user blogs. 

router.get('/likecount/:id', async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const likesCount = blog.likes.length;

        return res.status(200).json({ likesCount });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Route-12: Fetch trending blogs from db

router.get('/trending', async (req, res) => {
    try {
        const today = moment().endOf('day');
        const twoDaysAgo = moment().subtract(2, 'days').startOf('day');
    
        // Find blogs created today and in the past two days
        const blogs = await Blogs.find({
          createdAt: { $gte: twoDaysAgo.toDate(), $lte: today.toDate() },
        });
    
        // Filter blogs with likes greater than or equal to 3
        const filteredBlogs = blogs.filter(blog => blog.likes.length >= 3);
    
        // Fetch user information for each blog
        const blogsWithUserDetails = await Promise.all(filteredBlogs.map(async blog => {
          const user = await Users.findById(blog.user);
          return {
            _id: blog._id,
            title: blog.title,
            category: blog.category,
            description: blog.description,
            likes: blog.likes,
            user: {
              _id: user._id,
              username: user.username,
              email: user.emailId,
              location: user.location,
              link: user.link,
            },
            createdAt: blog.createdAt,
          };
        }));
    
        res.json(blogsWithUserDetails);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
});


module.exports = router;