const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// User model (if any)
const User = require('./models/User'); // Optional, create a User model in `models/User.js`

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user exists or create new one
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
      }
      return done(null, user);
    }
  )
);
