import express from 'express'
import { supabase } from '../supabaseClient.js'
import { AuthedRequest, authMiddleware } from '../middleware/authMiddleware.js'

const photosRouter = express.Router()

// Post photo
photosRouter.post('/', authMiddleware, async (req: AuthedRequest, res) => {
    const { caption, storage_path } = req.body;

    try {
        const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq('id', req.userId).single();
        if (profileError) {
            return res.status(400).json({ error: "Error loading profile" });
        }

        if (!profile.couple_id) {
            return res.status(400).json({ error: "This user is not part of a couple" });
        }

        const { data, error } = await supabase.from("photos").insert({
            couple_id: profile.couple_id,
            caption: caption,
            storage_path: storage_path,
            created_by: req.userId,
        }).select().single();

        if (error) {
            return res.status(500).json({ error: error });
        }

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Unexpected error getting notes" });
    }
})

// Get photos
photosRouter.get('/', authMiddleware, async (req: AuthedRequest, res) => {
    try {
        //TODO: filter by couple_id
        const { data, error } = await supabase.from('photos').select(`*, created_by:profiles(display_name)`).order("created_at", { ascending: false });
        if (error) throw error;

        const photos = data.map(photo => {
            const { data: dataUrl } = supabase.storage.from("photos").getPublicUrl(photo.storage_path);

            return {
                ...photo,
                url: dataUrl.publicUrl
            }
        })

        res.json(photos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})

export default photosRouter;