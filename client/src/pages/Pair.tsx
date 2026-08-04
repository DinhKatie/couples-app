import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Pair() {
    const { session } = useAuth();
    const navigate = useNavigate();

    const [pairingCode, setPairingCode] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        checkPairStatus();
    }, []);

    async function checkPairStatus() {
        const response = await fetch("/api/profile", {
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }
        });

        const profile = await response.json();

        if (profile.couple_id) {
            navigate("/room");
        }
    }

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
        <div>
            <h1>Pair With Your Partner</h1>

            <button onClick={generateCode}>Generate Code</button>

            {generatedCode && (<p>Your code:{generatedCode}</p>)}


            <input value={pairingCode} onChange={(e)=>setPairingCode(e.target.value)}
                placeholder="Enter partner's code"/>

            <button onClick={redeemCode}>Join</button>


            {error && (<p>{error}</p>)}
        </div>
    )
}