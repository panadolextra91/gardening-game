// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a secure secret in production

// Optional interface to represent the JWT payload
interface JwtPayload {
  userId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided or invalid token format' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and cast the decoded payload as JwtPayload.
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Attach userId to the request object (requires augmenting Express.Request as shown earlier)
    req.userId = decoded.userId;
    
    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }
};
