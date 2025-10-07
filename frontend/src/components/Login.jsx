import { useState } from 'react'
import { auth, provider } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      nav('/dashboard')
    } catch (err) {
      alert('Login failed: ' + err.message)
    }
  }

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert('Account created! Please log in.')
    } catch (err) {
      alert('Signup failed: ' + err.message)
    }
  }

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      nav('/dashboard')
    } catch (err) {
      alert('Google login failed: ' + err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Content Creator Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" />
          <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
          <button type="button" onClick={handleSignup} className="bg-gray-200 p-2 rounded">Create Account</button>
        </form>
        <div className="mt-4">
          <button onClick={googleLogin} className="w-full bg-red-500 text-white p-2 rounded">Login with Google</button>
        </div>
      </div>
    </div>
  )
}
