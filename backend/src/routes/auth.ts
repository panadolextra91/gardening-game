// src/routes/auth.ts

import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google Authentication Route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication.
    // You can redirect or send JSON as needed.
    res.json({ message: 'Google authentication successful!', user: req.user });
  }
);

export default router;
