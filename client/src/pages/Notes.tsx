import { useEffect, useState } from 'react'
import { type Note } from '../components/Note.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const { profile, session } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await fetch("http://localhost:3000/notes", {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`
                    }
                })
                const notesData = await data.json();
                console.log("data: ", notesData);
                setNotes(notesData);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [profile]);


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