import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin(){
  const [users,setUsers] = useState([])
  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_API_BASE || ''}/api/admin/users`).then(r=>setUsers(r.data)).catch(()=>{})
  }, [])
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin</h2>
      <table className="w-full border">
        <thead><tr><th>Email</th><th>Plan</th><th>Joined</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td className="p-2">{u.email}</td><td className="p-2">{u.plan}</td><td className="p-2">{new Date(u.createdAt?.toDate ? u.createdAt.toDate() : u.createdAt).toLocaleString()}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
