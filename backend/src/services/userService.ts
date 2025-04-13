// src/services/userService.ts

import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const prisma = new PrismaClient();
const EMAIL_USER = 'webappanhthu@gmail.com';
const EMAIL_PASS = 'bbxzdtltrethjppi';

export async function registerUser(email: string, password: string): Promise<User> {
  // Check if the user already exists.
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user with a starting coin balance.
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      coins: 500,
    },
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  // Find the user by email.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  // Compare passwords.
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Normally, token generation might be done elsewhere (e.g., a helper or in a controller),
  // but for simplicity, you could also include it here if desired.
  return user;
}

// CRUD operations:
export async function getAllUsersService(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUserByIdService(id: number): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function updateUserService(
  id: number,
  data: Partial<{ email: string; password: string; coins: number; }>
): Promise<User> {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUserService(id: number): Promise<User> {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Resets the password for a user who forgot their password.
 * Generates a new strong password, updates the user record, and sends an email with the new password.
 *
 * @param email - The email address of the user who forgot their password.
 * @returns A message indicating that the new password was sent.
 */
export async function forgotPassword(email: string): Promise<{ message: string }> {
    // 1. Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
  
    // 2. Generate a new strong password (e.g., 16 hex characters)
    const newPassword = crypto.randomBytes(8).toString('hex');
  
    // 3. Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
    // 4. Update the user's password in the database
    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword },
    });
  
    // 5. Set up Nodemailer transporter using the provided credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  
    // 6. Compose the email with the new password
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Password Reset - Your New Password',
      text: `Your new password is: ${newPassword}\nPlease change it as soon as possible.`,
    };
  
    // 7. Send the email
    await transporter.sendMail(mailOptions);
  
    return { message: 'A new password has been sent to your email address.' };
  }

  /**
 * Updates a user's password.
 * 
 * @param userId The ID of the user (from authentication).
 * @param currentPassword The user's current password (plain text).
 * @param newPassword The user's desired new password (plain text).
 * @returns The updated user.
 * @throws If the user is not found or if the current password is incorrect.
 */
export async function changeUserPassword(userId: number, currentPassword: string, newPassword: string): Promise<User> {
    // Find the user by their ID
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) {
      throw new Error('User not found or no password set.');
    }
  
    // Verify that the provided current password matches the stored hashed password.
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect.');
    }
  
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
    // Update the user record with the new hashed password.
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });
  
    return updatedUser;
  }
