import { useState } from "react";
import "../Styles/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");

  const isMobile = IsMobile();

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    if (selectedImages.length + newImages.length > 5) {
      setImageError("You can upload a maximum of 5 images.");
      return;
    } else {
      setImageError("");
    }

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageDelete = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if the product name already exists
    try {
      const existingProductResponse = await axios.get(
        `http://localhost:8080/products?name=${name}`
      );
      if (existingProductResponse.data.length > 0) {
        setError("Product with this name already exists.");
        return;
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while checking for existing products.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      selectedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await axios.post(
        "http://localhost:8080/sala",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
        <h2 className="mb-4">Add new product</h2>

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
                <h4>Enter the details of the new product</h4>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  name="name"
                  required
                />

                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description maximum of 250 characters"
                  name="description"
                  maxLength="250"
                  required
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Math.max(0, e.target.value))}
                  placeholder="Price"
                  name="price"
                  min="0"
                  required
                />

                <label htmlFor="quantity">Number of people</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, e.target.value))}
                  placeholder="Number of people"
                  name="quantity"
                  min="0"
                  required
                />

                <h4>Categories</h4>
                <div className="containerCheckbox">
                  <label>
                    <input type="checkBox" />
                    Private Office
                  </label>
                  <label>
                    <input type="checkBox" />
                    Meeting Room
                  </label>
                  <label>
                    <input type="checkBox" />
                    Full Time
                  </label>
                  <label>
                    <input type="checkBox" />
                    Lounge
                  </label>
                </div>

                <h4>Characteristics</h4>
                <div className="containerCheckbox characteristics">
                  <label>
                    <input type="checkBox" />
                    Wi-Fi
                  </label>
                  <label>
                    <input type="checkBox" />
                    Sillas Ergonómicas
                  </label>
                  <label>
                    <input type="checkBox" />
                    Aire Libre
                  </label>
                  <label>
                    <input type="checkBox" />
                    Aire Acondicionado
                  </label>
                  <label>
                    <input type="checkBox" />
                    Proyector
                  </label>
                  <label>
                    <input type="checkBox" />
                    Pizarra
                  </label>
                  <label>
                    <input type="checkBox" />
                    Sala Recreativa
                  </label>
                  <label>
                    <input type="checkBox" />
                    Cafetería
                  </label>
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
                  {imageError && (
                    <div className="error-message">
                      <FaExclamationTriangle style={{ marginRight: "8px" }} />
                      {imageError}
                    </div>
                  )}
                  {selectedImages.length > 0 && (
                    <div>
                      <p>Selected images: {selectedImages.length}/5</p>
                      {selectedImages.map((image, index) => (
                        <div key={index} className="image-preview-container">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            className="preview-image"
                          />
                          <button
                            onClick={() => handleImageDelete(index)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
    </>
  );
};

export default ProductForm;
