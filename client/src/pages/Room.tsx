import { Link, useNavigate } from "react-router-dom";
import { roomItems } from '../components/RoomItems.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import MoodLamp from '../components/MoodLamp.tsx';

export default function Room() {
    const navigate = useNavigate();
    const { profile } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
            <h1 className="text-white">Current user: {profile?.display_name} </h1>
            <MoodLamp />
            <div className="grid grid-cols-2 gap-10 text-white">

                {
                    roomItems.map(item => (

                        <button key={item.id} onClick={() => navigate(item.route)}>

                            <div className="text-4xl">{item.image}</div>
                            {item.name}

                        </button>

                    ))
                }

            </div>
        </div>

    )
}