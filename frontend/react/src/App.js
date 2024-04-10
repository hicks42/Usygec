import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './elements/Home';
import Navbar from './elements/Navbar/Nav';
import Activities from './elements/Activities';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className='App' >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  );
}
