import { useState } from 'react'
import './App.css'
import Footer from "./footer.jsx";
import Header from "./header.jsx";

import {Routes, Route } from "react-router-dom";
import Home from "./Home.jsx"
import Contact from "./Contact.jsx"
import BrowseSingers from "./BrowseSingers"

import SingerDetail from "./SingerDetail.jsx";
import Booking from "./Booking.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header /> 

      <Routes>
        <Route path="/" element={<Home />} /> {/*Homepage is the first one loaded.*/} 
        <Route path="/contact" element={<Contact />} />
        <Route path="/browse" element={<BrowseSingers />} />

        <Route path="/singer/:id" element={<SingerDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
