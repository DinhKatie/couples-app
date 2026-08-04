import { useEffect, useState } from 'react'
import { type Note } from '../components/Note.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const { session, loading } = useAuth();

    const [draft, setDraft] = useState("");
    const [sending, setSending] = useState(false);

    // TODO: fetch notes thru realtime
    useEffect(() => {
        if (loading || !session) return;
        const fetchNotes = async () => {
            try {
                const response = await fetch("/api/notes", {
                    headers: { Authorization: `Bearer ${session?.access_token}`}
                })
                
                const notesData = await response.json();
                    console.log("data: ", notesData);
                    setNotes(notesData);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [session, loading]);

    async function sendNote() {
        if (!draft.trim()) return; // Don't send empty notes
        setSending(true);
        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ content: draft })
            });

            if (!response.ok) {
                throw new Error(`Error sending note: ${response.statusText}`);
            }
        }
        catch (error) {
            console.error('Error sending note:', error);
        } finally {
            setSending(false);
            setDraft(""); //Reset
        }
    }


    return (
        <div className="min-h-screen bg-slate-900 px-4 py-8">
            <div className="mx-auto max-w-md">
                <h1 className="mb-6 text-center text-4xl font-bold text-white">Notes 💌</h1>

                <div className="mb-6 flex items-center gap-2">
                    <input type="text" value={draft} onChange={(e) => setDraft(e.target.value)}
                        placeholder="Write a note..."
                        className="flex-1 rounded-lg border border-gray-300 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
                    />
                    <button onClick={sendNote} disabled={sending}
                        className={`rounded-lg p-3 font-semibold text-white ${sending ? 'bg-gray-500' : 'bg-rose-300 hover:bg-rose-400'}`}>
                        {sending ? "Sending..." : "Send"}
                    </button>
                </div>

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