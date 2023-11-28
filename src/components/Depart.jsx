import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";

export const Depart = ({ getLocation, deleteNumber, setDeleteId }) => {
  const location = useLocation();

  const [departData, setDepartData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const getDepart = async () => {
    try {
      const response = await axios.get("https://baladia-program.onrender.com/depart");
      setDepartData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLocation(location);
  }, [location]);

  useEffect(() => {
    getDepart();
  }, []);

  useEffect(() => {
    for (const item in departData) {
      if (departData[item].DepartTd[0].number.toString() === deleteNumber) {
        setDeleteId(departData[item]._id);
      }
    }
  }, [departData, deleteNumber]);

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
              <TableCell>
                <h3 className="font-bold text-2xl p-4">Loading...</h3>
              </TableCell>
            </TableRow>
          ) : (
            departData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((depart) =>
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
      <TablePagination
        className="flex justify-center"
        rowsPerPageOptions={[5, 20, 25]}
        component="div"
        count={departData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
