import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {

    
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200">
            <p>Test</p>
        </div>

    )
}