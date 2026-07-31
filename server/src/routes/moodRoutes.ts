import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'

const moodRouter = express.Router()

// Update the user's mood
moodRouter.patch('/', authMiddleware, async (req: AuthedRequest, res) => {
    const { name } = req.body;
    try {
        const { data, error } = await supabase.from('profiles').update({ mood: name }).eq('id', req.userId).select();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Unexpected error updating mood" });
    }
})

export default moodRouter;