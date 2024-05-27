import {useEffect, useState} from 'react';
import axios from 'axios';
import MuiDataTables from 'mui-datatables';
import { Table, TableBody, TableCell, TableContainer, TableRow, TextField, Button } from '@mui/material';


import React from 'react'

const EditProducts = () => {

  const [data, setData] = useState([
    { name: 'full room', description: "Fully equipped  room", quantity: 10 , price: 100 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 7 , price: 50 },
    { name: 'small room', description: "Fully equipped  room", quantity: 4 , price: 30 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 8 , price: 60 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 7 , price: 45 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 7 , price: 40 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 6 , price: 50 },
    { name: 'small room', description: "Fully equipped  room", quantity: 2 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 1 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 2 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 3 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 1 , price: 100 },
    { name: 'full room', description: "Fully equipped  room", quantity: 15 , price: 100 },
    { name: 'full room', description: "Fully equipped  room", quantity: 12 , price: 100 },
    { name: 'full room', description: "Fully equipped  room", quantity: 15 , price: 100 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 6 , price: 100 },
    { name: 'medium room', description: "Fully equipped  room", quantity: 7 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 4 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 4 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 3 , price: 100 },
    { name: 'small room', description: "Fully equipped  room", quantity: 2 , price: 100 },   
  ]);
  const [editIdx, setEditIdx] = useState(-1);
  const [draftData, setDraftData] = useState({});

  const startEdit = (index, row) => {
    setEditIdx(index);
    setDraftData(row);
  };

  const cancelEdit = () => {
    setEditIdx(-1);
    setDraftData({});
  };

  const saveEdit = (index) => {
    const newData = [...data];
    newData[index] = draftData;
    setData(newData);
    setEditIdx(-1);
    setDraftData({});
    try {
      const response = axios.put(`http://localhost:8080/${draftData.id}`, draftData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (event) => {
    setDraftData({ ...draftData, [event.target.name]: event.target.value });
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {editIdx === index ? (
                  <TextField
                    name="name"
                    value={draftData.name}
                    onChange={handleEdit}
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editIdx === index ? (
                  <TextField
                    name="description"
                    value={draftData.description}
                    onChange={handleEdit}
                  />
                ) : (
                  row.description
                )}
              </TableCell>
              <TableCell>
                {editIdx === index ? (
                  <TextField
                    name="quantity"
                    value={draftData.quantity}
                    onChange={handleEdit}
                  />
                ) : (
                  row.quantity
                )}
              </TableCell>
              <TableCell>
                {editIdx === index ? (
                  <TextField
                    name="price"
                    value={draftData.price}
                    onChange={handleEdit}
                  />
                ) : (
                  row.price
                )}
              </TableCell>
              <TableCell>
                {editIdx === index ? (
                  <>
                    <Button onClick={() => saveEdit(index)}>Guardar</Button>
                    <Button onClick={cancelEdit}>Cancelar</Button>
                  </>
                ) : (
                  <Button onClick={() => startEdit(index, row)}>Editar</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );


    /* const columns = ["name","description","quantity","price"]
    const url = ''
    const options = {
      responsive:"standard",
      pagination:true
    }
    const data = [
        ["full room"," room full equipment","11","100"],
        ["medium room"," room full equipment","5","100"],
        ["small room"," room full equipment","3","100"],
        ["medium room"," room full equipment","8","100"],
        ["small room"," room full equipment","3","100"],
        ["full room"," room full equipment","12","100"],
        ["full room"," room full equipment","12","100"],
        ["medium room"," room full equipment","8","100"],
        ["medium room"," room full equipment","5","100"],
        ["medium room"," room full equipment","7","100"],
        ["small room"," room full equipment","1","100"],
        ["small room"," room full equipment","1","100"],
        ["small room"," room full equipment","3","100"],
        ["small room"," room full equipment","3","100"],
        ["full room"," room full equipment","11","100"],
        ["full room"," room full equipment","15","100"],

    ]
  return (
    <div>
      <MuiDataTables title="Rooms List" columns = {columns} data={data} options={options}/>
    </div>
  ) */
}

export default EditProducts
