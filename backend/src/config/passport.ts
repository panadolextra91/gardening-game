// src/config/passport.ts

import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Serialize user - no change needed here.
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user - update to return false instead of null when no user is found.
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    // If no user is found, pass false instead of null.
    done(null, user || false);
  } catch (err) {
    // Instead of passing null, pass false.
    done(err, false);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile: GoogleProfile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails && profile.emails[0].value,
              password: '', // Social login so no password.
              guest: false,
              coins: 500,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error as any, false);
      }
    }
  )
);

export default passport;
