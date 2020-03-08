var express = require('express');
var router = express.Router();


const userController = require('../controllers').user;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Computer Router */
router.post('/api/register', userController.add);

module.exports = router;
