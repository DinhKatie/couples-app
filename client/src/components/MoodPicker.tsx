import { useRef, useEffect } from "react";
import { useAuth } from '../context/AuthContext.tsx';

export const moods = [
    { name: "Happy", emoji: "😊", color: "bg-yellow-300" },
    { name: "Loved", emoji: "❤️", color: "bg-red-300" },
    { name: "Calm", emoji: "😌", color: "bg-blue-300" },
    { name: "Tired", emoji: "😴", color: "bg-purple-300" },
    { name: "Excited", emoji: "🤩", color: "bg-orange-300" },
    { name: "Sad", emoji: "🥲", color: "bg-slate-300" },
];

export default function MoodPicker({ onClose, onError, onSelectMood}: 
    { onClose: () => void, onError: (message: string)=>void, onSelectMood: (mood:string) => void}) {

    const pickerRef = useRef<HTMLDivElement>(null);
    const { session } = useAuth();

    //If anywhere else is clicked, close the mood picker
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    async function selectMood(mood: { name: string, emoji: string, color: string }) {
        onError("");
        try {
            console.log("Selected:", mood);

            const response = await fetch("/api/mood", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`,
                },
                body: JSON.stringify(mood),
            });

            const result = await response.json();

            if (!response.ok) {
                onError(result.message);
                return;
            }

            onSelectMood(mood.name)
            console.log(result);

        } catch (error) {
            console.error(error);
            onError("Couldn't save your mood");
        }

        onClose();
    }

    return (
        <div className="absolute mt-2 ml-2 z-50 w-70 rounded-lg bg-slate-800 p-4 shadow-lg">
            <div ref={pickerRef} className="grid grid-cols-3 gap-4">
                {moods.map((mood) => (
                    <button key={mood.name} onClick={() => selectMood(mood)}
                        className="flex flex-col items-center justify-center rounded-lg bg-slate-700 border border-gray-400 shadow-lg p-4 text-white">
                        <span className="text-3xl">{mood.emoji}</span>
                        <span className="mt-2 text-sm">{mood.name}</span>
                    </button>
                ))}
            </div>
        </div>

    )
}

