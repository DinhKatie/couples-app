import { useState } from "react";
import MoodPicker from "./MoodPicker.tsx";
import {moods} from "./MoodPicker.tsx"

export default function MoodLamp() {
    const [open, setOpen] = useState(false); //To turn moodpicker on or off
    const [error, setError] = useState("");
    const [mood, setMood] = useState("");
    const selectedMood = moods.find((m) => m.name === mood);
    
    return (
        <div className="relative">
            <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setOpen((prev) => !prev)} className="text-5xl">
                <img className="" style={{ filter: selectedMood?.color }} src="Lava Lamp Blue.png"/>
            </button>

            {open && (<MoodPicker onClose={() => setOpen(false)} onError={setError} onSelectMood={setMood} />)}
            <div className="flex flex-col items-center">
                {error && (
                    <p className="text-sm text-red-400 bg-red-950/40 rounded-lg px-3 py-2">{error}</p>
                )}
                {mood && (<p className="text-md text-white">{mood}</p>)}
            </div>

        </div>
    )
}