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
 *         description: Signup successful, user is verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User testuser signed up successfully and email verified."
 *       201:
 *         description: User created successfully, email verification pending
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User testuser created successfully. Please verify your email."
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
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already in use. Please log in."
 */

// 

// import { createClient as createClientServer } from '@/utils/supabase/server-props'; // server-side client
// import { createClient as createClientComponent } from '../../utils/supabase/component'; // client-side client

// export default async function handler(req, res) {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Username, email, and password are required' });
//   }
//   const supabaseClient = createClientComponent(); // For client-side operations like signUp
//   const supabaseAdmin = createClientServer(); // Server-side Supabase client


//   // Step 1: Check if the email is already registered by trying to sign in
//   const { user, error: signInError } = await supabaseClient.auth.signInWithPassword(email,password);

//   if (signInError && signInError.message === 'Email not found') {
//     // The email does not exist, proceed with signup
//   } else if (user) {
//     // If the user already exists, return a conflict response
//     return res.status(409).json({
//       message: 'Email is already registered and verified. Please log in.',
//     });
//   } else if (signInError) {
//     // Handle any other error
//     return res.status(500).json({
//       message: 'Error checking if the user exists.',
//       error: signInError.message,
//     });
//   }
//   // Use the appropriate client for each action
//   // const supabaseServer = createClientServer(); // For server-side operations like getUser

//   // Step 1: Insert a new user into Supabase auth (client-side)
//   const { data, error } = await supabaseClient.auth.signUp({
//     email,
//     password,
//   });


//   if (error) {
//     return res.status(400).json({
//       message: error.message || 'Signup failed. Please try again.',
//     });
//   }
//   return res.status(201).json({
//     message: `User ${username} signed up successfully. Please verify your email.`,
//   });
// }
// import { createClient as createClientServer } from '@/utils/supabase/server-props'; // server-side client
import { createClient as createClientComponent } from '../../utils/supabase/component'; // client-side client

export default async function handler(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  const supabaseClient = createClientComponent(); // For client-side operations like signUp
  // const supabaseAdmin = createClientServer(); // Server-side Supabase client

  try {
    // Step 1: Check if the email already exists using the RPC function
    const { data: existingUser, error: rpcError } = await supabaseClient.rpc('get_user_id_by_email', { email });

    if (rpcError) {
      throw new Error(`Error checking existing user: ${rpcError.message}`);
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({
        message: 'Email is already registered. Please log in.',
      });
    }

    // Step 2: Insert a new user into Supabase auth
    const { data, error: signupError } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      throw new Error(signupError.message || 'Signup failed. Please try again.');
    }


    // Step 4: Return success response
    return res.status(201).json({
      message: `User ${username} signed up successfully. Please verify your email.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
