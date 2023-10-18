import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './elements/Home';
import Navbar from './elements/Navbar/Nav';
import Activities from './elements/Activities';

export default function App() {
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
