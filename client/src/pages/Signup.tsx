import { useState } from 'react'
import { supabase } from '../supabaseClient.ts'
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data: { user }, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { display_name: displayName } } });
            if (error) throw error;
            if (!user) throw new Error("No user returned");
            const { error: profileError } = await supabase.from('profiles').insert({ id: user.id, display_name: displayName });
            if (profileError) throw profileError;
            navigate("/login");
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

                <label htmlFor="email" className="text-sm font-medium text-slate-300">New Email</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>

                <label htmlFor="displayName" className="text-sm font-medium text-slate-300">Display Name</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                    required>
                </input>

                <label htmlFor="password" className="text-sm font-medium text-slate-300">New Password</label>
                <input className="bg-slate-800 rounded p-2 w-full text-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    required>
                </input>

                <button className="w-full rounded-md bg-pink-400 py-2 mt-4 font-semibold text-white hover:bg-pink-500" type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                {error && (
                    <p className="text-sm text-red-400 bg-red-950/40 rounded-lg px-3 py-2">{error}</p>
                )}

                <div className="mt-4 flex justify-between text-slate-300">
                    <Link to="/login" className="hover:underline">Already have an account? Login</Link>
                </div>
            </form>
        </div>

    )
}