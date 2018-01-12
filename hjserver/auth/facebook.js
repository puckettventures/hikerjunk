const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

//facebook oauth info
const FACEBOOK_APP_ID = "164600600934577";
const FACEBOOK_APP_SECRET = "cf97d21e1fdf48e256bcffe4a6a4971b";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("attempt findorcreate init");
      User.findOrCreate(
        { name: profile.displayName },
        { name: profile.displayName, userid: profile.id, profile: profile },
        function(err, user) {
          console.log("attempt findorcreate success");
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
