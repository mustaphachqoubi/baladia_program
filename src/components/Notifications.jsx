import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

export const Notifications = () => {

  const [arriveeData, setArriveeData] = useState([]);
  const [departData, setDepartData] = useState([]);

  const getArrivee = async () => {
    try {
      const arrivee = await axios.get("https://baladia-program.onrender.com/arrivee/delay");
      const depart = await axios.get("https://baladia-program.onrender.com/depart");
      setArriveeData(arrivee.data);
      setDepartData(depart.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function handleAnswerDocument(documentId, dataCategory) {
    const endpoint = dataCategory === 'depart' ? 'depart' : 'arrivee';

    try {
        // Assuming you want to make a POST request to mark the document as answered
        await axios.patch(`https://baladia-program.onrender.com/${endpoint}/delay/${documentId}`);
        
        // Refresh the data after marking as answered
        getArrivee();
    } catch (error) {
        console.error("Error marking as answered:", error);
    }

  }

  useEffect(() => {
    getArrivee();
  }, []);

  return (
    <>
    <div className="bg-red-500 text-white font-bold p-2 w-full my-5 text-center"> You have a delay in arrivee data</div>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Date d'arrivée et N° d'ordere annuel</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Date et N° de la lettre d'arrivée</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Désignation du destinataire</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Analyse de l'affaire</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Date et numéro de la réponse</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Answer status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arriveeData.length <= 0 ? (
            <TableRow>
              <TableCell>
                <h3 className="font-bold text-2xl p-4">Loading...</h3>
              </TableCell>
            </TableRow>
          ) : (
            arriveeData.map((arrivee) =>
              arrivee.ArriveeTd.map((d) => (
                <TableRow
                  key={arrivee._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{d.number}</TableCell>
                  <TableCell align="center">{d.messageDate}</TableCell>
                  <TableCell align="center">{d.reciever}</TableCell>
                  <TableCell align="center">{d.subject}</TableCell>
                  <TableCell align="center">{d.answerdate}</TableCell>
                  <TableCell align="center">
                <input onClick={(e) => e.target.value === "on" && handleAnswerDocument(arrivee._id, 'arrivee')} type="checkbox" /></TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>


    <div className="bg-red-500 text-white font-bold p-2 w-full my-5 text-center"> You have a delay in depart data</div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Date de depart et N° d'ordre annuel
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Date et N° de la lettre depart
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Désignation du destinataire
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Analyse de l'affaire
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Date et numéro de la réponse
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departData.length <= 0 ? (
            <TableRow>
            <TableCell >
                <h3 className="font-bold text-2xl p-4">Loading...</h3>
              </TableCell>
            </TableRow>
          ) : (
            departData.map((depart) =>
              depart.DepartTd.map((d) => (
                <TableRow
                    key={depart._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{d.number}</TableCell>
                  <TableCell align="center">{d.messageDate}</TableCell>
                  <TableCell align="center">{d.reciever}</TableCell>
                  <TableCell align="center">{d.subject}</TableCell>
                  <TableCell align="center">{d.answerdate}</TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
