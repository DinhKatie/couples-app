import { useState } from "react";
import MoodPicker from "./MoodPicker.tsx";
import {moods} from "./MoodPicker.tsx"

interface MoodLampProps {
    displayMood? : string | null
}

export default function MoodLamp({displayMood}: MoodLampProps) {
    const [open, setOpen] = useState(false); //To turn moodpicker on or off
    const [error, setError] = useState("");
    const [mood, setMood] = useState("");
    const selectedMood = moods.find((m) => m.name === mood);
    const displayMoodColor = displayMood ? moods.find((m) => m.name === displayMood) : null;
    
    return (
        <div className="relative">
            <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setOpen((prev) => !prev)} className="text-5xl">
                <img className="" style={{ filter: displayMoodColor?.color ?? selectedMood?.color }} src="Lava Lamp Blue.png"/>
            </button>

            {!displayMood && open && (<MoodPicker onClose={() => setOpen(false)} onError={setError} onSelectMood={setMood} />)}
            {!displayMood && <div className="flex flex-col items-center">
                {error && (
                    <p className="text-sm text-red-400 bg-red-950/40 rounded-lg px-3 py-2">{error}</p>
                )}
                {mood && (<p className="text-md text-white">{mood}</p>)}
            </div>}

        </div>
    )
}