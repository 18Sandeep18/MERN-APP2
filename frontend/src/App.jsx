import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Profile from './Pages/Profile';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route  element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

