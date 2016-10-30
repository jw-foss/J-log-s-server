var express = require('express');
var router = express.Router();
var Post = require('../database/post');
//fetch data from the Database
router.get('/', function(req, res, next) {
  Post.getAll(null, function (err, posts) {
    if (err) {
      posts = [];
    }
  res.json(posts);
  });
});

module.exports = router