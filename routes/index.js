var express = require('express');
var router = express.Router();
const POSTS = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/read-post', function(req, res, next) {
  res.render('read-post', {POSTS});
});
router.get('/create-post', function(req, res, next) {
  res.render('create-post');
});
router.post('/create-post', function(req, res, next) {
  let post = {...req.body, date: new Date, Like:0};
  POSTS.push(post);
  res.redirect("/read-post")
});

router.get('/delete/:i', function(req, res, next) {
  POSTS.splice(req.params.i);
  res.redirect("/read-post")
});

router.get(`/update/:i`, function(req, res, next){
 const post = POSTS[req.params.i];
  res.render("update", {post:post, i:req.params.i})
});

router.post(`/update/:i`, function(req, res, next){
  POSTS[req.params.i] = {...req.body, date: new Date, Like:0};
  res.redirect("/read-post")
});

router.get(`/Like/:i`, function(req, res, next){
  like = POSTS[req.params.i];
  like.Like += 1;
  POSTS[req.params.i] = like;
  res.redirect("/read-post")
})
module.exports = router;
