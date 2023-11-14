import { useState } from "react";
import { TheTable } from "./components/Table.jsx";
import { Navbar } from "./components/Navbar";
import { Depart } from "./components/Depart";
import { Arrivee } from "./components/Arrivee";
import { Notifications } from "./components/Notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormControl } from "@mui/base/FormControl";
import { useForm } from "react-hook-form";

function App() {


  const [formDisplay, setFormDisplay] = useState("hidden")
  const [location, setLocation] = useState("")

  const { register, handleSubmit, watch } = useForm();

  const number = watch("yearly_order_number");
  const messageDate = watch("date_number");
  const reciever = watch("destination");
  const subject = watch("deal_analyse");
  const answerdate = watch("response_date_number"); 

  const getLocation = (location) => {
    setLocation(location)
  }

  const onSubmit = (data) => {
    if(location.pathname === "/depart"){
      console.log("yes")
    } else{
      console.log("no")
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar setFormDisplay={setFormDisplay} formDisplay={formDisplay} />

        <form onSubmit={handleSubmit(onSubmit)} className={`${formDisplay} bg-white m-4 p-4 rounded-md flex-col gap-4 items-center text-black`}>
          <input {...register("number")} type="number" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <input {...register("messageDate")} type="date" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <textarea {...register("reciever")} type="text" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <textarea {...register("subject")} type="text" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <input {...register("answerdate")} type="date" className="w-60 p-2 text-white border-2 border-black rounded-md"/>
          <button type="submit" className="bg-black text-white py-2 px-4 rounded-md font-bold hover:bg-white hover:text-black border-2 border-black">Save</button>
        </form>

        <Routes>
          <Route index element={<Notifications />} />
          <Route path="depart" element={<Depart getLocation={getLocation} />} />
          <Route path="arrivee" element={<Arrivee getLocation={getLocation} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
