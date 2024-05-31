/* import React, { useState } from "react";
import "../Styles/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/header.css";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";


const CharacteristicForm = () => {
  const [name, setName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    selectedImages: [],
  });

  const isMobile = IsMobile();

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(name, selectedImages);
  };

  return (
    <div className="contenedorBody">
      <div className="containerButton">
        <Link to="/admin" className="genericButton link-flex">
          <FaArrowLeft className="iconSpace" /> Go back
        </Link>
      </div>
      <h2 className="mb-4">New characteristic</h2>
      
      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <div className="containerForm justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-column">
              <h4>Characteristic Form</h4>
              <label htmlFor="name">Characteristic Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="mb-3"
              />

              <div className="image-preview">
                <label htmlFor="images" style={{ marginRight: "6px" }}>
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  id="images"
                />
                {selectedImages.length > 0 && selectedImages.length < 6 && (
                  <div>
                    <p>Selected Images</p>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="containerButton">
                <button type="submit" className="genericButton">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CharacteristicForm; */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";
import "../Styles/Form.css";

const CharacteristicForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isMobile = IsMobile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
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
      <h2 className="mb-4">New characteristic</h2>

      {isMobile ? (
        <div className="mobile-message-card">
          <div className="mobile-message-icon">
            <FaExclamationTriangle />
          </div>
          <h2>This view is not available on mobile devices.</h2>
        </div>
      ) : (
        <div className="containerForm justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-column">
              <h4>Characteristic Form</h4>
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
        </div>
      )}
    </div>
  );
};

export default CharacteristicForm;