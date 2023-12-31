import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';

export const Arrivee = ({ getLocation, deleteNumber, setDeleteId }) => {
  const location = useLocation();

  const [arriveeData, setArriveeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const getArrivee = async () => {
    try {
      const response = await axios.get("https://baladia-program.onrender.com/arrivee");
      setArriveeData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLocation(location);
  }, [location]);

  useEffect(() => {
    getArrivee();
  }, []);

  useEffect(() => {
    for(const item in arriveeData){
      if(arriveeData[item].ArriveeTd[0].number.toString() === deleteNumber){
        setDeleteId(arriveeData[item]._id)
      }
    }
  }, [arriveeData, deleteNumber])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Date d'arrivée et N° d'ordere annuel</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Date et N° de la lettre d'arrivée</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Désignation du destinataire</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Analyse de l'affaire</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Date et numéro de la réponse</TableCell>
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
              arriveeData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((arrivee) =>
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
                    </TableRow>
                  ))
                )
            )}
          </TableBody>
        </Table>
        <TablePagination
        className="flex justify-center"
        rowsPerPageOptions={[5, 20, 25]}
        component="div"
        count={arriveeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
  );
}

