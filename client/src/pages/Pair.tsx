import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Pair() {
    const { session, loading, profile } = useAuth();
    const navigate = useNavigate();

    const [pairingCode, setPairingCode] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [error, setError] = useState("");

    if (loading) return <div className="min-h-screen bg-slate-900" />;
    if (profile?.couple_id) return <Navigate to="/room" replace />;

    async function generateCode() {
        const response = await fetch("/api/pairing/generate", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            return;
        }

        setGeneratedCode(data.pairingCode);
    }


    async function redeemCode() {
        const response = await fetch("/api/pairing/redeem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`
            },
            body: JSON.stringify({pairingCode})
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            return;
        }

        navigate("/room");
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
            <div className="flex flex-col w-full p-4 gap-2 max-w-sm">

                <label htmlFor="pairingCode" className="text-sm font-medium text-slate-300">Pairing Code</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="pairingCode" type="text" value={pairingCode} onChange={(e) => setPairingCode(e.target.value)}
                    placeholder="Enter partner's pairing code">
                </input>

                <button className="w-full rounded-md bg-pink-400 py-2 mt-4 font-semibold text-white hover:bg-pink-500" onClick={redeemCode}>
                    Redeem Code
                </button>

                <div className="my-4 text-center text-slate-300">or</div>

                <button className="w-full rounded-md bg-pink-400 py-2 mt-4 font-semibold text-white hover:bg-pink-500" onClick={generateCode}>
                    Generate Pairing Code
                </button>

                {generatedCode && (
                    <div className="mt-4 p-2 bg-slate-800 rounded text-center text-white">
                        Your pairing code: <span className="font-bold">{generatedCode}</span>
                    </div>
                )}

                {error && (
                    <p className="text-sm text-red-400 bg-red-950/40 rounded-lg px-3 py-2">{error}</p>
                )}

            </div>
        </div>
    )
}