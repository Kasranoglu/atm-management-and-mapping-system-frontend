import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { TablePagination } from "@mui/material";
import axios from 'axios';
import EditAtmModal from '../components/modal';

export default function Home() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [rows, setRows] = useState([]);
    const [selectedAtm, setSelectedAtm] = useState(null);
    const [open, setOpen] = useState(false);
    const [atmUpdated, setAtmUpdated] = useState(false); // Güncellemeleri takip eden bir state



    const handleSave = (updatedAtm) => {
        axios.put(`https://localhost:7217/api/atm-machine/update`, updatedAtm)
            .then(response => {
                const updatedRows = rows.map(row => row.id === updatedAtm.id ? updatedAtm : row);
                setRows(updatedRows);
                handleClose();
                setAtmUpdated(prev => !prev); // ATM güncellemesi sonrası durumu değiştir
            })
            .catch(error => {
                console.error('Error updating ATM:', error);
            });
    };

    useEffect(() => {
        axios.get('https://localhost:7217/api/atm-machine/list')
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[atmUpdated] );

    const handleOpen = (atm) => {
        setSelectedAtm(atm);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ p: 7 }}>
            <DenseTable rows={rows} page={page} rowsPerPage={rowsPerPage} onEdit={handleOpen} />
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <EditAtmModal open={open} handleClose={handleClose} atmData={selectedAtm} handleSave={handleSave} />
        </Box>
    );
}

function DenseTable({ rows, page, rowsPerPage, onEdit }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Address</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>City Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>District Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>IsActive</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.adress}</TableCell>
                            <TableCell align="right">{row.cityName}</TableCell>
                            <TableCell align="right">{row.districtName}</TableCell>
                            <TableCell align="right">{row.isActive ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">
                                <ModeEditOutlineTwoToneIcon
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => onEdit(row)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

