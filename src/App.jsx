import { useState } from "react";
import { TheTable } from "./components/Table.jsx";
import { Navbar } from "./components/Navbar";
import { Depart } from "./components/Depart";
import { Arrivee } from "./components/Arrivee";
import { Notifications } from "./components/Notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormControl } from "@mui/base/FormControl";

function App() {

  const [formDisplay, setFormDisplay] = useState("hidden")

  return (
    <>
      <BrowserRouter>
        <Navbar setFormDisplay={setFormDisplay} formDisplay={formDisplay} />

        <FormControl className={`${formDisplay} bg-white m-4 p-4 rounded-md flex-col gap-4 items-center text-black`}>
          <input type="number" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <input type="date" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <textarea type="text" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <textarea type="text" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <input type="date" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <button className="bg-black text-white py-2 px-4 rounded-md font-bold hover:bg-white hover:text-black border-2 border-black">Save</button>
        </FormControl>

        <Routes>
          <Route index element={<Notifications />} />
          <Route path="depart" element={<Depart />} />
          <Route path="arrivee" element={<Arrivee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
