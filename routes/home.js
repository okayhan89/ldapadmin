var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  console.log("test");
  res.render('home', { title: 'Express' });
});

module.exports = router;
