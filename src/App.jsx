import { useState } from 'react'
import { TheTable } from "./components/Table.jsx"
import { Navbar } from './components/Navbar'
import { Depart } from './components/Depart'
import { Arrivee } from './components/Arrivee'
import { Notifications } from './components/Notifications'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route index element={<Notifications />} />
          <Route path="depart" element={<Depart/>} />
          <Route path="arrivee" element={<Arrivee />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
