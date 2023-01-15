const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let authenticatedUser;
      try {
        const foundUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (!foundUser) {
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          await newUser.save();
          authenticatedUser = newUser;
          console.log("user registered");
        } else {
          console.log("user already exists");
          authenticatedUser = foundUser;
        }
      } catch (err) {
        console.log(err);
      }
      return done(null, authenticatedUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
