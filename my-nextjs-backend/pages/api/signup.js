// pages/api/signup.js

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: This endpoint allows a new user to register with a username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: testuser
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User testuser signed up successfully"
 *       400:
 *         description: Missing username, email, or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username, email, and password are required"
 */

export default function handler(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, email, and password are required' });
  }

  // Fake signup logic for demonstration purposes
  return res
    .status(200)
    .json({ message: `User ${username} signed up successfully` });
}
