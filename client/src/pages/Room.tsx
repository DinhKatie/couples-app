import { useState } from 'react'
import { supabase } from '../supabaseClient.ts'
import { Link, useNavigate } from "react-router-dom";
import { roomItems } from '../components/RoomItems.tsx';

export default function Room() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
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