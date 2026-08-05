import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { type Photo } from '../components/Photo.tsx';
import { supabase } from "../supabaseClient.ts";

export default function Photos() {
    const { session, profile, loading } = useAuth();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (loading || !session) return;
        const fetchPhotos = async () => {
            try {
                const response = await fetch("/api/photos", {
                    headers: { Authorization: `Bearer ${session?.access_token}` }
                })

                const photosData = await response.json();
                console.log("data: ", photosData);
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();


    }, [session, loading]);

    async function uploadPhoto() {
        setUploading(true);
        if (!file || !profile) return;

        try {
            const path = `${profile.couple_id}/${crypto.randomUUID()}-${file.name}`;
            const { data, error } = await supabase.storage.from("photos").upload(path, file);

            if (error) throw error;

            const response = await fetch("/api/photos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ caption: caption, storage_path: path })
            });

            console.log("upload result:", data, error);
            console.log("POST response:", await response.json());
        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setUploading(false);
            setCaption("");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
            <div className="flex flex-col items-center justify-center text-white">
                <div className="space-y-4 text-white">
                    <input type="file" accept="image/*" onChange={(e) => {
                        const selectedFile = e.target.files?.[0];

                        if (selectedFile) {
                            setFile(selectedFile);
                        }
                    }} />

                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption (optional)"
                        className="flex-1 rounded-lg border border-gray-300 bg-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none"
                    />


                    <button onClick={uploadPhoto} disabled={!file || uploading} className="rounded-lg bg-rose-300 px-4 py-2">
                        {uploading ? "Uploading..." : "Upload"}
                    </button>


                    {photos.map(photo => (
                        <div key={photo.id} className="rounded-2xl bg-slate-700 p-5 shadow-md transition hover:shadow-lg">
                            <span className="font-semibold text-white">From: {photo.created_by.display_name}</span>
                            <span className="ml-2 text-sm text-gray-400">{new Date(photo.created_at).toLocaleString()}</span>
                            <img src={photo.url} className="rounded-xl" />
                            <p>{photo.caption}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}