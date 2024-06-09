import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
  TableHead,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";
import data from "../Data/recommendData.json";
import "../Styles/Form.css";

const EditProducts = () => {
  const [productData, setProductData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [draftData, setDraftData] = useState({});
  const isMobile = IsMobile();

  useEffect(() => {
    setProductData(data.data);
  }, []);

  const startEdit = (index, row) => {
    setEditIdx(index);
    setDraftData({ ...row });
  };

  const cancelEdit = () => {
    setEditIdx(-1);
    setDraftData({});
  };

  const saveEdit = (index) => {
    const newData = [...productData];
    newData[index] = draftData;
    setProductData(newData);
    setEditIdx(-1);
    setDraftData({});
    try {
      const response = axios.put(
        `http://localhost:8080/products/${draftData.id}`,
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
    const newData = productData.filter((_, idx) => idx !== index);
    setProductData(newData);
    try {
      const response = axios.delete(
        `http://localhost:8080/products/${productData[index].id}`
      );
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

      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <TableContainer className="form-column">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    CATEGORY
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    NAME
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    DESCRIPTION
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    PEOPLE
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    PRICE
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ACTIONS
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editIdx === index ? (
                      <TextField
                        name="id"
                        value={draftData.id}
                        onChange={handleEdit}
                      />
                    ) : (
                      row.id
                    )}
                  </TableCell>
                  <TableCell>
                    {editIdx === index ? (
                      <TextField
                        name="category"
                        value={draftData.Category}
                        onChange={handleEdit}
                      />
                    ) : (
                      row.Category
                    )}
                  </TableCell>
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
                        name="people"
                        value={draftData.people}
                        onChange={handleEdit}
                      />
                    ) : (
                      row.people
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
                        <Button onClick={() => saveEdit(index)}>Save</Button>
                        <Button onClick={cancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => startEdit(index, row)}>
                          Edit
                        </Button>
                        <Button onClick={() => deleteRow(index)}>Delete</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EditProducts;
