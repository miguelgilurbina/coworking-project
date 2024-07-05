import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {apiCaracteristica} from "../Data/axiosConfig";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaCaretDown,
} from "react-icons/fa";
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
import * as Icons from "react-icons/fa";

const iconList = Object.keys(Icons).map((icon) => {
  return {
    name: icon,
    component: Icons[icon],
  };
});

const CharacteristicForm = () => {
  const [characteristicData, setCharacteristicData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [draftData, setDraftData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const isMobile = IsMobile();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState(30);

  useEffect(() => {
    setCharacteristicData(caracteristicas.caracteristicas);
  }, []);

  const startEdit = (index, row) => {
    setEditIdx(index);
    setDraftData({ ...row });
    setIcon(row.icon);
  };

  const cancelEdit = () => {
    setEditIdx(-1);
    setDraftData({});
    setIcon("");
  };

  const saveEdit = async (index) => {
    const newData = [...characteristicData];
    newData[index] = draftData;
    setCharacteristicData(newData);
    setEditIdx(-1);
    setDraftData({});
    try {
      // Integrar con el backend
      const response = await apiCaracteristica.put(
        `/characteristicsPUT${draftData.id}`,
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

  const deleteRow = async (index) => {
    const newData = characteristicData.filter((_, idx) => idx !== index);
    setCharacteristicData(newData);
    try {
      // Integrar con el backend
      const response = await apiCaracteristica.delete(
        `/characteristicsDEKETE${characteristicData[index].id}`
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
      const response = await apiCaracteristica.post("/characteristicsPOST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, icon }),
      });

      if (!response.ok) {
        throw new Error("Failed to add characteristic");
      }

      const newCharacteristic = await response.json();
      setCharacteristicData([...characteristicData, newCharacteristic]);
      setShowAddSuccess(true);

      console.log("Characteristic added successfully");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    }
  };

  const loadMoreIcons = () => {
    setVisibleIcons((prevVisibleIcons) => prevVisibleIcons + 30);
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">List & Add Characteristics</h2>
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
                        ICON
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
                  {characteristicData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editIdx === index ? (
                          <input
                            name="id"
                            value={draftData.id}
                            onChange={handleEdit}
                            style={{ width: "70px" }}
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
                            style={{ width: "130px" }}
                          />
                        ) : (
                          row.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editIdx === index ? (
                          <select
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            required
                            style={{ width: "130px" }}
                          >
                            <option value="">Select an icon</option>
                            {iconList.map((icon) => (
                              <option key={icon.name} value={icon.name}>
                                {icon.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          row.icon && React.createElement(Icons[row.icon])
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
                <h4>Add new characteristic</h4>
                <label htmlFor="name">Characteristic Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="mb-3"
                  required
                />
                {icon && (
                  <div className="icon-preview">
                    <p>Selected Icon:</p>
                    {React.createElement(Icons[icon])}
                  </div>
                )}
                <label htmlFor="icon">Select Icon</label>
                <div className="icon-list">
                  {iconList.slice(0, visibleIcons).map((iconItem) => (
                    <div
                      key={iconItem.name}
                      className={`icon-item ${
                        icon === iconItem.name ? "selected" : ""
                      }`}
                      onClick={() => setIcon(iconItem.name)}
                    >
                      {React.createElement(iconItem.component)}
                    </div>
                  ))}
                </div>
                {visibleIcons < iconList.length && (
                  <a className="seeMore" onClick={loadMoreIcons}>
                    See More Icons
                    <FaCaretDown className="seeMoreIcon" />
                  </a>
                )}
                <div className="containerButton centerContaniner">
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
                    Characteristic <strong>ADDED</strong> successfully.
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
              Characteristic <strong>REMOVED</strong> successfully.
            </span>
          }
        />
      )}
    </div>
  );
};

export default CharacteristicForm;
