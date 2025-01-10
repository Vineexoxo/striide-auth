import { createClient } from '../../utils/supabase/component'; // Import your Supabase client creation logic

/**
 * @swagger
 * /api/entry:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information for a given user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user whose profile is to be updated.
 *                 example: dummy@gmail.com
 *               user_info:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     description: The user's city.
 *                     example: Bangalore
 *                   state:
 *                     type: string
 *                     description: The user's state.
 *                     example: Karnataka
 *                   occupation:
 *                     type: string
 *                     description: The user's occupation.
 *                     example: Engineer
 *                   gender:
 *                     type: string
 *                     description: The user's gender.
 *                     example: Male
 *                   birthdate:
 *                     type: string
 *                     description: The user's birthdate in ISO 8601 format.
 *                     example: "2025-01-16T00:00:00Z"
 *                   phone_number:
 *                     type: string
 *                     description: The user's phone number.
 *                     example: ""
 *                   transport_modes:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of transport modes the user uses.
 *                     example: ["Biking", "Walking", "Driving", "PublicTransport"]
 *                   commute_frequency:
 *                     type: string
 *                     description: The frequency of the user's commute.
 *                     example: Monthly
 *                   travel_time:
 *                     type: string
 *                     description: The user's preferred time for travel.
 *                     example: Night
 *                   feed_type:
 *                     type: string
 *                     description: The user's preferred feed type.
 *                     example: Email_Newsletter
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and user_info are required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update profile
 *       502:
 *         description: Unknown error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unknown error occurred
 */
export default async function updateProfile(req, res) {
  const supabase = createClient();
  const { email, user_info } = req.body;

  if (!email || !user_info) {
    return res.status(400).json({ error: 'Email and user_info are required' });
  }

  try {
    // Call the RPC function to update the user's profile
    const { error } = await supabase.rpc('update_profile_by_email', {
        p_email: email,
        p_city: user_info.city,
        p_state: user_info.state,
        p_occupation: user_info.occupation,
        p_gender: user_info.gender,
        p_birthdate: user_info.birthdate,
        p_phone_number: user_info.phone_number,
        p_transport_modes: user_info.transport_modes,
        p_commute_frequency: user_info.commute_frequency,
        p_travel_time: user_info.travel_time,
        p_feed_type: user_info.feed_type
      });

    if (error) {
      console.error('Error updating profile:', error.error);
      return res.status(500).json({ error: 'Failed to update profile', details: error.message });
    }

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
