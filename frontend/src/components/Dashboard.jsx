import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import PayButton from './PaystackButton'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard(){
  const nav = useNavigate()
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState('')
  const [scripts, setScripts] = useState([])

  useEffect(()=> {
    // fetch user scripts
    const fetchScripts = async () => {
      try {
        const token = await auth.currentUser?.getIdToken()
        const res = await axios.get(`${import.meta.env.VITE_API_BASE || ''}/api/scripts`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setScripts(res.data)
      } catch (err) { /* ignore */ }
    }
    if (auth.currentUser) fetchScripts()
  }, [])

  const logout = async () => {
    await signOut(auth)
    nav('/')
  }

  const generate = async () => {
    if (!topic) return alert('Enter a topic')
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await axios.post(`${import.meta.env.VITE_API_BASE || ''}/api/generate`, {
        topic, tone: 'educational', length: 'medium'
      }, { headers: { Authorization: `Bearer ${token}` } })
      if (res.data?.script) setResult(res.data.script)
      else alert(res.data?.message || 'No response')
    } catch (err) {
      alert('Generation failed: ' + (err?.response?.data?.message || err.message))
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {auth.currentUser?.email}</h1>
      <div className="flex gap-2 mb-4">
        <input value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="Enter a YouTube topic..." className="border p-2 rounded w-80" />
        <button onClick={generate} className="bg-blue-600 text-white px-3 py-2 rounded">Generate</button>
      </div>

      <PayButton amount={25} onSuccess={() => {
        // after Paystack success, optionally call backend to upgrade user
        alert('Payment successful - upgrade flow should be implemented on backend.')
      }} />

      {result && (
        <div className="mt-6 p-4 border bg-white rounded max-w-3xl">
          <h3 className="font-semibold">Generated Script</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      <div className="mt-6">
        <h4 className="font-semibold">Past Scripts</h4>
        <ul>
          {scripts.map((s)=> <li key={s.id} className="mb-2 p-2 border">{s.topic} — {new Date(s.createdAt?.toDate ? s.createdAt.toDate() : s.createdAt).toLocaleString()}</li>)}
        </ul>
      </div>

      <button onClick={logout} className="mt-6 bg-red-500 text-white px-3 py-2 rounded">Logout</button>
    </div>
  )
}
