import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'

const notesRouter = express.Router()

// Get all notes
notesRouter.get('/', authMiddleware, async (req: AuthedRequest, res) => {

    try {
        const {data, error} = await supabase.from('notes').select('*');
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
})

export default notesRouter;