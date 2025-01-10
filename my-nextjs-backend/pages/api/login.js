// pages/api/login.js

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows a user to log in with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       400:
 *         description: Missing username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username and password are required"
 */
import { Request, Response } from 'express';

import { createClient } from '../../utils/supabase/component'

export default async function handler(req, res) {
  const { email, password } = req.body;
  const supabase = createClient()


  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  // Authenticate the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: 'Invalid credentials', error: error.message });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: data.user,
    session: data.session,
  });
}
