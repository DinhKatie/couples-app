import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabaseClient.js';

export interface AuthedRequest extends Request {
  userId?: string
}

export async function authMiddleware(req: AuthedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No authorization' });
    }

    try {
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = data.user.id;
        console.log(data);

    } catch (err) {
        console.log("Unexpected authorization error: ", err);
        return res.status(401).json({error: "Unexpected authorization error"});
    }

    // StEVE ID req.userId = "af72c9f7-c7bc-4aa7-9696-9cf70f484bc8";

    return next();
}