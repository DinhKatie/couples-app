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
                {/* My Mood Lamp */}
                <RoomItem x={1200} y={720} width={150} height={150}>
                    <img src="/Stool.png"/>
                </RoomItem>
                <RoomItem x={1230} y={490} width={100} height={80}>
                    <MoodLamp></MoodLamp>
                </RoomItem>

                {/* Partner Mood Lamp */}
                <RoomItem x={1400} y={780} width={150} height={150}>
                    <img src="/Stool.png"/>
                </RoomItem>
                <RoomItem x={1430} y={550} width={100} height={80}>
                    <MoodLamp displayMood={"Calm"}></MoodLamp>
                </RoomItem>

                {/*Drawer, Notes, Photo Frames*/}
                <RoomItem x={466} y={575} width={414} height={260}>
                    <img src="/Drawerdesk.png"/>
                </RoomItem>
                <RoomItem x={415} y={159} width={353} height={332}>
                    <img src="/Photo Frames.png"/>
                </RoomItem>
                <RoomItem x={673} y={424} width={146} height={109}>
                    <div onClick={() => navigate("/notes")} className="w-full h-full cursor-pointer">
                        <img src="/Notes.png" />
                    </div>
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