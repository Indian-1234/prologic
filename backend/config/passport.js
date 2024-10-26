// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        accessToken:accessToken,    // Save access token
          refreshToken:refreshToken,   
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        const user = await User.findOne({ githubId: profile.id });
        if (user) {
          // Update the existing user with new tokens
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          return done(null, user);
        }
  
        const newUser = new User({
          githubId: profile.id,
          name: profile.username,
          email: profile.username, // This might need to be adjusted
          accessToken:accessToken,    // Save access token
          refreshToken:refreshToken,   // Save refresh token
        });
        await newUser.save();
        done(null, newUser);
      }
    )
  );
  

module.exports = passport;
