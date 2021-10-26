const express = require('express');
const passport = require('passport')
const router = express.Router();


const Users = require('../models/Users')





require('../passport/config')(passport)

const { login, register, getUser } = require('../controllers/auth')

// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', (err, user, info)  => {
//       if (err) { return next(err); }
//       if (!user) { return res.send('User doesnt exist'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         res.send(user);
        
//       });
      
//     })(req, res, next), login}) 

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req.session)
    res.send(req.user.username);
});


router.get('/login', function(req, res) {
    console.log(req.user)
    res.send(req.user);
});

// router.post('/register', register) 

router.post('/register', function(req, res, next) {
    console.log('registering user');
    Users.register(new Users({username: req.body.username}), req.body.password, function(err) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }
      passport.authenticate("local")(req,res,()=>{
        res.send("user Registered");
    });
      
    });
  });

router.get('/user', getUser)

router.get('/logout', function(req, res){
    req.logout();
    res.send('Logged out')
  });

module.exports = router;