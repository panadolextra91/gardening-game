/// <reference path="../types/express/index.d.ts" />
// src/controllers/userController.ts

import { Request, Response } from 'express';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await userService.registerUser(email, password);
    // Optionally, you could generate a token here.
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await userService.loginUser(email, password);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserByIdService(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser = await userService.updateUserService(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedUser = await userService.deleteUserService(id);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body as { email: string };
      const result = await userService.forgotPassword(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  export const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract userId from request, set by the authentication middleware.
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized.' });
        return;
      }
      
      // Extract currentPassword and newPassword from the request body.
      const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };
      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: 'Both currentPassword and newPassword are required.' });
        return;
      }
  
      // Call the service to change the password.
      const updatedUser = await userService.changeUserPassword(userId, currentPassword, newPassword);
      res.status(200).json({ message: 'Password changed successfully.', user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };