import React, { useState, useEffect } from "react";
import "../Styles/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";
import Alert from "./Alert";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isMobile = IsMobile();
  const [characteristics, setCharacteristics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3002/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const response = await fetch("http://localhost:3004/caracteristicas");
        if (!response.ok) {
          throw new Error("Failed to fetch characteristics");
        }
        const data = await response.json();
        setCharacteristics(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characteristics:", error);
        setLoading(false);
      }
    };

    fetchCharacteristics();
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    if (selectedImages.length + newImages.length > 5) {
      setImageError("You can upload a maximum of 5 images.");
      return;
    } else {
      setImageError("");
    }

    const base64Promises = newImages.map((image) => convertImageToBase64(image));

    try {
      const base64Results = await Promise.all(base64Promises);
      setBase64Images((prevBase64Images) => [...prevBase64Images, ...base64Results]);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error("Error converting images to base64:", error);
      setImageError("Failed to convert one or more images.");
    }
  };

  const handleImageDelete = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((image, i) => i !== index));
    setBase64Images((prevBase64Images) => prevBase64Images.filter((_, i) => i !== index));
    setImageError("");
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (base64Images.length === 0) {
        setImageError("Please upload at least one image.");
        return;
      }

      if (!selectedCategory) {
        setError("Please select a category.");
        return;
      }

      const formData = {
        name,
        description,
        quantity,
        price,
        srcImg: base64Images.length > 0 ? base64Images[0] : "",
        images: base64Images.slice(1),
        Category: selectedCategory.title, // Incluir la categoría seleccionada en el formData
      };

      const response = await axios.post("http://localhost:3003/data", formData);
      console.log(response.data);
      setSuccessMessage("Room successfully added!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <div className="contenedorBody">
        <div className="containerButton">
          <Link to="/admin" className="genericButton link-flex">
            <FaArrowLeft className="iconSpace" /> Go back
          </Link>
        </div>
        <h2 className="mb-4">Add new room</h2>

        {isMobile ? (
          <div className="mobile-message-card">
            <div className="mobile-message-icon">
              <FaExclamationTriangle />
            </div>
            <h2>This view is not available on mobile devices.</h2>
          </div>
        ) : (
          <div className="containerForm">
            <form className="formProduct" onSubmit={handleSubmit}>
              <div className="form-column">
                <h4>Enter the details of the new room</h4>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  name="name"
                />

                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  name="description"
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  name="price"
                />

                <label htmlFor="quantity">Number of people</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Number of people"
                  name="quantity"
                />

                <h4>Categories</h4>
                <div className="containerCheckbox">
                  {categories.map((category) => (
                    <label key={category.id} >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory && selectedCategory.id === category.id}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category.title}
                    </label>
                  ))}
                </div>

                <h4>Characteristics</h4>
                <div className="containerCheckbox characteristics">
                  {loading ? (
                    <p>Loading characteristics...</p>
                  ) : (
                    characteristics.map((characteristic) => (
                      <label key={characteristic.id}>
                        <input type="checkbox" />
                        {characteristic.name}
                      </label>
                    ))
                  )}
                </div>

                <div className="containerButton">
                  <button className="genericButton" type="submit">
                    Send
                  </button>
                </div>
              </div>

              <div className="form-column">
                <div className="image-upload">
                  <label htmlFor="images">Upload images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    id="images"
                  />
                  {selectedImages.length > 0 && (
                    <div>
                      <p>
                        {selectedImages.length} image
                        {selectedImages.length > 1 ? "s" : ""} selected
                      </p>
                      {selectedImages.map((image, index) => (
                        <div key={index} className="image-preview-container">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            className="preview-image"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {imageError && (
                    <div className="image-error">
                      <FaExclamationTriangle className="iconSpace" />
                      {imageError}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      {error && <Alert type="error" message={error} />}
      {successMessage && <Alert type="success" message={successMessage} />}
    </>
  );
};

export default ProductForm;
