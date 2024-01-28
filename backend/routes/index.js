var express = require('express');
var router = express.Router();
const userSchema = require('./users'); 
const collectionSchema = require('./users') 

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', async function(req, res) {
  const createdUser = await userSchema.create({
    username: "Deep",
    emailid: "deeppandya@gmail.com"  
  });
    res.send(createdUser)
});

/*router.get('/two', async function(req, res){
  const collection = await collectionSchema.create({
    blogTitle: "ADD",
    bloggerUsername: "nams",
    blogCategory: "hesoyam",
    blogDescription: "i dont like"
  });
  res.send(collection);
});*/

module.exports = router;
