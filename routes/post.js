var express = require('express');
var router = express.Router();
var Post = require('../database/post');
//passport middleware


//authentication page
router.get('/', function (req, res, next) {
  res.render('login');
});
router.post('/', function (req, res, next) {
  var username = 'jeremy';
  var password = 'wqx425236987';
  req.session.admin = {
    name: username,
    password: password
  }
  if (username === req.body.username && password === req.body.password) {
    console.log('matched')
    res.redirect('/j_log/post');
  }
  res.redirect('/j_log');
});

//to post page
router.get('/post', isLoggedIn);
router.get('/post', function (req, res, next) {
  res.render('post');
})
// deal post request
router.post('/post', function (req, res, next) {
  //define data
  console.log(req.body.date);
  var title = req.body.title,
    date = req.body.date,
    content = req.body.content,
    author = 'Jeremy Wu',
    code = Date.now(),

    //define a post object that contains everything I need 
    post = new Post(title, date, content, author, code);
  //use post's save method to put the data into database
  post.save(function (err) {
    if (err) {
      req.send('error occured');
      res.redirect('/post');
    }
    res.redirect('/');
  });
});
//deal logout
router.get('/logout', function (req, res, next) {
  res.redirect('/');
});
//check login
function isLoggedIn(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/j_log');
}

module.exports = router;