import { useState } from 'react'
import { supabase } from '../supabaseClient.ts'
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
            if (error) throw error;
            navigate("/room");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
            <img src="/couples.png" alt="Couples Logo" className="max-w-xs" />
            <form className="flex flex-col w-full p-4 gap-2 max-w-sm" onSubmit={onSubmit}>

                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>

                <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    required>
                </input>

                <button className="w-full rounded-md bg-pink-400 py-2 mt-4 font-semibold text-white hover:bg-pink-500" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && (
                    <p className="text-sm text-red-400 bg-red-950/40 rounded-lg px-3 py-2">{error}</p>
                )}

                <div className="mt-4 flex justify-between text-slate-300">
                    <Link to="/signup" className="hover:underline">Sign Up</Link>
                    {/* <a href="/forgot-password" className="hover:underline">Forgot Password?</a> */}
                </div>
            </form>
        </div>

    )
}