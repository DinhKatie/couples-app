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
        <div className="min-h-screen bg-slate-900 px-4 py-8">
            <div className="mx-auto max-w-md">
                <h1 className="mb-6 text-center text-4xl font-bold text-white">Notes 💌</h1>
                <div className="space-y-4">
                    {notes.map(note => (
                        <div key={note.id} className="rounded-2xl bg-slate-700 p-5 shadow-md transition hover:shadow-lg">
                                <span className="font-semibold text-white">From: {note.sender.display_name}</span>
                                <span className="ml-2 text-sm text-gray-400">{new Date(note.created_at).toLocaleString()}</span>
                            <p className="whitespace-pre-wrap break-words text-lg text-white">
                                {note.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}