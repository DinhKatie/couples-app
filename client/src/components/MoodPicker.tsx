import {useRef, useEffect} from "react";

export const moods = [
    { name: "Happy", emoji: "😊", color: "bg-yellow-300" },
    { name: "Loved", emoji: "❤️", color: "bg-red-300" },
    { name: "Calm", emoji: "😌", color: "bg-blue-300" },
    { name: "Tired", emoji: "😴", color: "bg-purple-300" },
    { name: "Excited", emoji: "🤩", color: "bg-orange-300" },
    { name: "Sad", emoji: "🥲", color: "bg-slate-300" },
];

export default function MoodPicker({ onClose }: { onClose: () => void }) {
    const pickerRef = useRef<HTMLDivElement>(null);

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

    function selectMood(mood: { name: string; emoji: string; color: string }) {
        console.log("Selected:", mood);

        

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

