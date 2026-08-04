import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'
import crypto from 'crypto'

const pairingRouter = express.Router()

// Generate a new pairing code
pairingRouter.post('/generate', authMiddleware, async (req: AuthedRequest, res) => {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); //10 min

    try {
        //Create a new couple
        const { data: couple, error: coupleError } = await supabase.from('couples').insert(
            {
                user_a_id: req.userId,
                pairing_code: code,
                pairing_code_expiration: expiry
            }).select().single();

        if (coupleError) {
            console.log(coupleError);
            return res.status(500).json({
                error: "Couldn't generate pairing code"
            });
        }

        //Update that the user is paired after they generate a code and create a couple
        const { data, error } = await supabase.from("profiles").update({ couple_id: couple.id }).eq("id", req.userId);
        if (error) {
            console.log(coupleError);
            return res.status(500).json({
                error: "Couldn't generate pairing code"
            });
        }

        res.status(201).json({pairingCode: code })
    } catch (err) {
        console.log("Unexpected error generating pairing code: ", err);
        res.status(500).json({ error: "Error Generating Code" });
    }
})

// Redeem and join a pair
pairingRouter.post('/redeem', authMiddleware, async (req: AuthedRequest, res) => {
    const { pairingCode } = req.body;
    const userId = req.userId;

    try {
        const { data: coupleData, error: coupleError } = await supabase.from('couples').select('*').eq('pairing_code', pairingCode).single();

        if (coupleError || !coupleData) {
            return res.status(404).json({ error: 'Invalid pairing code' });
        }

        if (new Date(coupleData.pairing_code_expiration) < new Date()) {
            return res.status(400).json({ error: 'Pairing code has expired' });
        }

        if (coupleData.user_b_id || coupleData.user_a_id === userId || coupleData.user_b_id === userId) {
            return res.status(400).json({ error: 'Pair already exists or user already part of this couple' });
        }

        const { error } = await supabase.from('couples').update({ user_b_id: userId }).eq('pairing_code', pairingCode);
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error joining couple' });
        }

        // Update couple_id in the user's profile, CURRENTLY REWRITABLE
        const { error: updateError } = await supabase.from('profiles').update({ couple_id: coupleData.id }).eq('id', userId);
        if (updateError) {
            console.log(updateError);
            return res.status(500).json({ error: 'Error updating user profile' });
        }

        res.status(200).json({ message: "Successfully redeemed" });

    } catch (err) {
        console.log("Unexpected error redeeming pairing code: ", err);
        res.status(500).json({ error: "Error redeeming pairing code" });
    }
})

export default pairingRouter