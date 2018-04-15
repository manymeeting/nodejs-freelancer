var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoUtil = require("./utils/mongoDBUtil");
var bcrypt = require('bcryptjs');


passport.use(new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        mongoUtil.getMongoConn(function(db) {
          var coll = db.collection('users');
          coll.findOne({"user_email": email}, function(err, result) {
            if(err)
            {
              throw err;
            }
            console.log(result);

            if(result === null)
            {
              return cb(null, false, {message: 'User does not exist.'}); 
            }
            
            var user = result;

            // compare hash value
            if(!bcrypt.compareSync(password, user.user_password))
            {
              return cb(null, false, {message: 'Incorrect password.'});
            }

            return cb(null, user, {message: 'Logged In Successfully'});
          });

        });
    }
));

module.exports = passport;