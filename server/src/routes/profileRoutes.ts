import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'

const profileRouter = express.Router()

profileRouter.get("/profile", authMiddleware, async (req: AuthedRequest, res) => {
    const { data, error } = await supabase.from("profiles").select("*")
        .eq("id", req.userId).single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

export default profileRouter;