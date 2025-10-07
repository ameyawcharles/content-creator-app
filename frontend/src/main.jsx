import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'
import './index.css'
createRoot(document.getElementById('root')).render(<BrowserRouter><Routes><Route path='/' element={<App/>}/><Route path='/login' element={<Login/>}/><Route path='/dashboard' element={<Dashboard/>}/><Route path='/admin' element={<Admin/>}/></Routes></BrowserRouter>)
