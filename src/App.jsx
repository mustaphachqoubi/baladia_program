import { useState, useEffect } from "react";
import { TheTable } from "./components/Table.jsx";
import { Navbar } from "./components/Navbar";
import { Depart } from "./components/Depart";
import { Arrivee } from "./components/Arrivee";
import { Notifications } from "./components/Notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormControl } from "@mui/base/FormControl";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const [formDisplay, setFormDisplay] = useState("hidden");
  const [location, setLocation] = useState("");
  const [deleteDisplay, setDeleteDisplay] = useState("hidden");
  const [deleteId, setDeleteId] = useState(null);

  const { register, handleSubmit, watch } = useForm();

  const number = watch("yearly_order_number");
  const messageDate = watch("date_number");
  const reciever = watch("destination");
  const subject = watch("deal_analyse");
  const answerdate = watch("response_date_number");
  const deleteNumber = watch("delete_number");

  const getLocation = (location) => {
    setLocation(location);
  };

  const deleteItem = (e) => {
    e.preventDefault();

    if (location.pathname === "/arrivee") {
      axios
        .delete(`https://baladia-program.onrender.com/arrivee/${deleteId}`)
        .then((res) => {
          window.location.reload()
        });
    }

    if (location.pathname === "/depart") {
      axios
        .delete(`https://baladia-program.onrender.com/depart/${deleteId}`)
        .then((res) => {
          window.location.reload()
        });
    }
  };

  const onSubmit = async (data) => {
    const waitedData = await data;

    if (location.pathname === "/depart") {
      try {
        const response = await axios.post(process.env.REACT_APP_DEPART, {
          DepartTd: [waitedData],
        });
          window.location.reload()
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (location.pathname === "/arrivee") {
      try {
        const response = await axios.post(
          "https://baladia-program.onrender.com/arrivee",
          {
            ArriveeTd: [waitedData],
          }
        );
          window.location.reload()
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar
          setFormDisplay={setFormDisplay}
          formDisplay={formDisplay}
          setDeleteDisplay={setDeleteDisplay}
          deleteDisplay={deleteDisplay}
        />

        <form
          onSubmit={deleteItem}
          className={`${deleteDisplay} bg-white m-4 p-4 rounded-md flex-col gap-4 items-center text-black`}
        >
          <p className="font-bold bg-red-500 text-white py-2 px-4 rounded-md ">
            Put the number of the item that you want to delete
          </p>
          <input
            {...register("delete_number")}
            type="number"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md font-bold hover:bg-white hover:text-black border-2 border-black"
          >
            Delete
          </button>
        </form>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${formDisplay} bg-white m-4 p-4 rounded-md flex-col gap-4 items-center text-black`}
        >
          <input
            required
            {...register("number")}
            type="number"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <input
            required
            {...register("messageDate")}
            type="date"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <textarea
            required
            {...register("reciever")}
            type="text"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <textarea
            required
            {...register("subject")}
            type="text"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <input
            {...register("answerdate")}
            type="date"
            className="w-60 p-2 text-white border-2 border-black rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md font-bold hover:bg-white hover:text-black border-2 border-black"
          >
            Save
          </button>
        </form>

        <Routes>
          <Route index element={<Notifications />} />
          <Route path="depart" element={<Depart setDeleteId={setDeleteId} deleteNumber={deleteNumber} getLocation={getLocation} />} />
          <Route
            path="arrivee"
            element={<Arrivee setDeleteId={setDeleteId} deleteNumber={deleteNumber} getLocation={getLocation} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
