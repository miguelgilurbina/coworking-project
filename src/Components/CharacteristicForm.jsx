import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import Modal from "./Modal";
import caracteristicas from "../Data/characteristics.json";
import "../Styles/Form.css";
import Alert from "./Alert";

const CharacteristicForm = () => {
  const [characteristicData, setCharacteristicData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [draftData, setDraftData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const isMobile = IsMobile();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  useEffect(() => {
    setCharacteristicData(caracteristicas.caracteristicas);
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
    const newData = [...characteristicData];
    newData[index] = draftData;
    setCharacteristicData(newData);
    setEditIdx(-1);
    setDraftData({});
    try {
      //TODO: INTEGRAR CON EL BACK
      const response = axios.put(
        `http://localhost:8080/characteristics/${characteristicData.id}`,
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

  const openModal = (index) => {
    setCurrentRow(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRow(null);
  };

  const confirmDelete = () => {
    deleteRow(currentRow);
    setShowRemoveSuccess(true);
    setTimeout(() => setShowRemoveSuccess(false), 3000);
    closeModal();
  };

  const deleteRow = (index) => {
    const newData = characteristicData.filter((_, idx) => idx !== index);
    setCharacteristicData(newData);
    try {
      //TODO: INTEGRAR CON EL BACK
      const response = axios.delete(
        `http://localhost:8080/characteristics/${characteristicData[index].id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      //TODO: INTEGRAR CON BACK
      const response = await fetch("http://localhost:3004/caracteristicas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add characteristic");
      }

      setShowAddSuccess(true);

      console.log("Characteristic added successfully");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">Characteristics</h2>
      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <div className="d-flex">
          <div className="form-column">
            <TableContainer>
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
                        NAME
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        ACTIONS
                      </Typography>
                    </TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {characteristicData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editIdx === index ? (
                          <input
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
                          <input
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
                          <>
                            <Button onClick={() => saveEdit(index)}>
                              Save
                            </Button>
                            <Button onClick={cancelEdit}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button onClick={() => startEdit(index, row)}>
                              Edit
                            </Button>
                            <Button onClick={() => openModal(index)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="form-column">
            <form onSubmit={handleSubmit}>
              <div className="form-column">
                <h4>Add new characteristic </h4>
                <label htmlFor="name">Characteristic Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="mb-3"
                  required
                />

                <div className="containerButton">
                  <button type="submit" className="genericButton">
                    Send
                  </button>
                </div>
              </div>
            </form>
            {error && (
              <div className="error-message">
                <FaExclamationTriangle style={{ marginRight: "8px" }} />
                {error}
              </div>
            )}
            {showAddSuccess && (
              <Alert
                type="success"
                message={
                  <span>
                    Characteristic
                    <strong> ADDED</strong> successfully.
                  </span>
                }
              />
            )}
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          title="Confirm Delete"
          body={
            <p>
              You are about to delete a characteristic. Are you sure you want to
              continue?
            </p>
          }
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}

      {showRemoveSuccess && (
        <Alert
          type="success"
          message={
            <span>
              Characteristic
              <strong> REMOVED</strong> successfully.
            </span>
          }
        />
      )}
    </div>
  );
};

export default CharacteristicForm;
