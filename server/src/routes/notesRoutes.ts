import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'

const notesRouter = express.Router()

// Get all notes
// TODO: Filter by couple_id and order by created_at
notesRouter.get('/', authMiddleware, async (req: AuthedRequest, res) => {

    try {
        const {data, error} = await supabase.from('notes').select(`*, sender:profiles(display_name)`);
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Unexpected error getting notes"});
    }
})

// Create a new note
notesRouter.post('/', authMiddleware, async (req: AuthedRequest, res) => {
    const { content } = req.body;
    const userId = req.userId;

    try {
        const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (profileError) throw profileError;

        const {data, error} = await supabase.from('notes').insert({couple_id: profileData.couple_id, sender_id: userId, content: content});
        if (error) throw error;
        res.status(201).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
        //res.status(500).json({error: "Unexpected error posting the note"});
    }
})

export default notesRouter;