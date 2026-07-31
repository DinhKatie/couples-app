import { useState } from "react";
import MoodPicker from "./MoodPicker.tsx";

export default function MoodLamp() {
    const [open, setOpen] = useState(false); //To turn moodpicker on or off

    return (
        <div className="relative">
            <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setOpen((prev) => !prev)} className="text-5xl">
                🏮
            </button>

            {open && (<MoodPicker onClose={() => setOpen(false)}/>)}
        </div>
    )
}