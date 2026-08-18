import { Link, useNavigate } from "react-router-dom";
import RoomItem from '../components/RoomItems.tsx';
import RoomCanvas from "./RoomCanvas.tsx";
import { useAuth } from '../context/AuthContext.tsx';
import MoodLamp from '../components/MoodLamp.tsx';

export default function Room() {
    const navigate = useNavigate();
    const { profile } = useAuth();

    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
            <h1 className="text-white">Current user: {profile?.display_name} </h1>
            <RoomCanvas>
                <RoomItem x={1200} y={720} width={150} height={150}>
                    <img src="/Stool.png"/>
                </RoomItem>
                <RoomItem x={1215} y={450} width={120} height={80}>
                    <MoodLamp></MoodLamp>
                </RoomItem>
            </RoomCanvas>
            {/* <MoodLamp/>
            <div className="grid grid-cols-2 gap-10 text-white">

                {roomItems.map(item => (
                        <button key={item.id} onClick={() => navigate(item.route)}>
                            <div className="text-4xl border rounded-xl bg-slate-400">{item.image}</div>
                            {item.name}
                        </button>
                    ))}
            </div> */}
        </div>

    )
}