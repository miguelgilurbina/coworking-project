import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../Styles/admin.css";

const EditProducts = () => {
  const [data, setData] = useState([
    {
      name: "full room",
      description: "Fully equipped room",
      quantity: 10,
      price: 100,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 7,
      price: 50,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 4,
      price: 30,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 8,
      price: 60,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 7,
      price: 45,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 7,
      price: 40,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 6,
      price: 50,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 2,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 1,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 2,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 3,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 1,
      price: 100,
    },
    {
      name: "full room",
      description: "Fully equipped room",
      quantity: 15,
      price: 100,
    },
    {
      name: "full room",
      description: "Fully equipped room",
      quantity: 12,
      price: 100,
    },
    {
      name: "full room",
      description: "Fully equipped room",
      quantity: 15,
      price: 100,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 6,
      price: 100,
    },
    {
      name: "medium room",
      description: "Fully equipped room",
      quantity: 7,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 4,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 4,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 3,
      price: 100,
    },
    {
      name: "small room",
      description: "Fully equipped room",
      quantity: 2,
      price: 100,
    },
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
      const response = axios.put(
        `http://localhost:8080/${draftData.id}`,
        draftData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (event) => {
    setDraftData({ ...draftData, [event.target.name]: event.target.value });
  };

  const deleteRow = (index) => {
    const newData = data.filter((_, idx) => idx !== index);
    setData(newData);
    try {
      const response = axios.delete(`http://localhost:8080/${data[index].id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">Edit product</h2>

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
                    <>
                      <Button onClick={() => startEdit(index, row)}>
                        Editar
                      </Button>
                      <Button onClick={() => deleteRow(index)}>Eliminar</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EditProducts;
