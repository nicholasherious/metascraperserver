const express = require('express');
const passport = require('passport')
const router = express.Router();





require('../passport/config')(passport)

const { login, register, getUser } = require('../controllers/auth')

router.post('/login', function(req, res, next) {
    passport.authenticate('local', (err, user, info)  => {
      if (err) { return next(err); }
      if (!user) { return res.send('User doesnt exist'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.send(user.username);
      });
    })(req, res, next), login}) 

router.post('/register', register) 

router.get('/user', getUser)

router.get('/logout', function(req, res){
    req.logout();
    res.send('Logged out')
  });

module.exports = router;