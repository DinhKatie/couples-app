import { useState } from 'react'
import { supabase } from '../supabaseClient.ts'
import { Link, useNavigate } from "react-router-dom";
import { type Note } from '../components/Note.tsx';

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);

    


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
            <h1 className="text-4xl text-white mb-4">Notes</h1>
            <div>
                {notes.map(note => (
                    <div key={note.id} className="rounded-lg bg-slate-100 p-4 mb-3">
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}