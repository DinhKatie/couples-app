import { Link, useNavigate } from "react-router-dom";
import RoomItem from '../components/RoomItems.tsx';
import RoomCanvas from "./RoomCanvas.tsx";
import { useAuth } from '../context/AuthContext.tsx';
import MoodLamp from '../components/MoodLamp.tsx';

export default function Room() {
    const navigate = useNavigate();
    const { profile } = useAuth();

    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-900 flex flex-col">
            <h1 className="text-white">Current user: {profile?.display_name} </h1>

            <div className="flex-1 flex items-center justify-center min-h-0">
                <RoomCanvas>
                    <RoomItem x={0} y={0}>
                        <img className="w-full h-full" src="/full background.png"/>
                    </RoomItem>
                </RoomCanvas>
            </div>

        </div>

    )
}