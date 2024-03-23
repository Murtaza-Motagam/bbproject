var express = require('express');
var router = express.Router();
const Users = require('../model/Users')
const Blogs = require('../model/Blogs')
const fetchUser = require('../middlewares/fetchUser')


// ROUTE-1: FOLLOWERS AND FOLLOWING route

router.post('/following/:id', fetchUser, async (req, res) => {

    const followedUserId = req.params.id;

    try {
        // Check if both users exist
        const user = await Users.findById(req.user.id);
        const followedUser = await Users.findById(followedUserId);

        if (!user || !followedUser) {
            return res.status(404).json({ message: 'User or followed user not found' });
        }

        // Update following array of the user
        if (!user.following.includes(followedUserId)) {
            user.following.push(followedUserId);
            followedUser.followers.push(req.user.id);
            await user.save();
            await followedUser.save();
        }

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ROUTE-2: Fetch single user profile by their _id

router.get('/getuser/:id', fetchUser, async (req, res) => {

    let success = false;
    try {
        // Check if both users exist
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        success = true;

        res.json({ success, user });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ROUTE-3: Get List of user while search for a particular one 

router.get('/search', fetchUser, async (req, res) => {

    const searchTerm = req.query.term; // Get the search term from the query string

    try {

        let success = false;
        // Search for users based on the username or emailId
        const users = await Users.find({
            $or: [
                { username: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for username
                { emailId: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for emailId
            ],
        });

        if (!users) {
            res.status(404).json({ success, message: "User Not Found!" });
        }

        success = true;
        res.status(200).json({ success, users });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ROUTE-4: Get List of user follower following and total posts 

router.get('/getnavdetails', fetchUser, async (req, res) => {

    const user = req.user.id;

    try {
        const totalBlogs = await Blogs.countDocuments({ user: user });
        const userFollowers = await Users.find({ following: user });
        const totalFollowers = userFollowers.length;

        const userFollowing = await Users.findById(user).select('following');
        const totalFollowing = userFollowing.following.length;

        res.json({
            totalPostsLength: totalBlogs,
            totalFollowers,
            totalFollowing,
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ROUTE-5: Get list of details of users followers

router.get('/listoffollowers', fetchUser, async (req, res) => {
    try {
        let success = false;
        const userId = req.user.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const followerIds = user.followers;
        const followers = await Users.find({ _id: { $in: followerIds } });
        success = true;
        res.json({ success, followers });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// ROUTE-6: Get list of details of users followings

router.get('/listoffollowings', fetchUser, async (req, res) => {
    try {
        let success = false;

        const userId = req.user.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ success, message: 'User not found' });
        }
        const followingIds = user.following;
        const following = await Users.find({ _id: { $in: followingIds } });
        success = true;
        res.json({ success, following });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// ROUTE-7: Fetch entire searched users profile details including its blogs

router.get('/finduser/:id', fetchUser, async (req, res) => {
    try {
        let success = false;

        const searchedUser = await Users.findById(req.params.id);
        if (!searchedUser) {
            res.status(404).json({ success, message: "Sorry user not found" });
        }

        const searchedUserBlogs = await Blogs.find({ user: req.params.id });

        if (!searchedUserBlogs) {
            res.status(404).json({ success, message: "Sorry user doesn't have any blogs" });
        }
        success = true
        res.json({ success, searchedUser, searchedUserBlogs })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// ROUTE-8: Fetch entire searched users nav details

router.get('/finduser/navdetails/:id', fetchUser, async (req, res) => {
    try {
        let success = false;
        const user = req.params.id;

        const totalBlogs = await Blogs.countDocuments({ user: user });
        const userFollowers = await Users.find({ following: user });
        const totalFollowers = userFollowers.length;

        const userFollowing = await Users.findById(user).select('following');
        const totalFollowing = userFollowing.following.length;

        success = true;

        res.json({
            success,
            totalPostsLength: totalBlogs,
            totalFollowers,
            totalFollowing,
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Route-9:  check if a user is already following another user

router.get('/following/:otherUserId', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isFollowing = user.following.includes(req.params.otherUserId);
        res.json({ isFollowing });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE-10: Get list of details of other users followers

router.get('/listoffollowers/:id', fetchUser, async (req, res) => {
    try {
        let success = false;
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const followerIds = user.followers;
        const followers = await Users.find({ _id: { $in: followerIds } });
        success = true;
        res.json({ success, followers });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// ROUTE-11: Get list of details of other users followings

router.get('/listoffollowings/:id', fetchUser, async (req, res) => {
    try {
        let success = false;

        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ success, message: 'User not found' });
        }
        const followingIds = user.following;
        const following = await Users.find({ _id: { $in: followingIds } });
        success = true;
        res.json({ success, following });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router