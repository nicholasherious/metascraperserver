
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport) {

    passport.use(new localStrategy(Users.authenticate()));
    
// passport.use( 
//     new localStrategy((username, password, done) => {
//         Users.findOne({ username: username}, (err, user) => {
//             if(err) return done(err)
//             if(!user) return done(null, false, { message: 'Incorrect username.' })
//             bcrypt.compare(password, user.password, (err, result) => {
//                 if(err) throw err
//                 if (result === true) {
//                     return done(null, user)
//                 } else {
//                     return done(null, false, { message: 'Incorrect password.' })
//                 }
//             })
//         })
//     })
// )

// passport.

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// passport.serializeUser((user, cb) => {
//     cb(null, user._id);
//     // console.log(user._id)
//   });
  
// passport.deserializeUser((id, cb) => {
//     Users.findById({_id: id}, (err, user) => {
//         console.log(id)
//       cb(err, user);
//     });
//   });

}