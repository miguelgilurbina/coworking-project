import { useState } from "react";
import "../Styles/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/header.css";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import IsMobile from "./IsMobile";


const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const isMobile = IsMobile();

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // Aqui convierte la lista de archivos en un array
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

  const handleImageDelete = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/sala", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(name, description, quantity, price, selectedImages);
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
                <h4>Enter the details of the new salon</h4>
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
                  {selectedImages.length > 0 && selectedImages.length < 6 && (
                    <div>
                      <p>Selected images</p>
                      {selectedImages.map((image, index) => (
                        <div key={index} className="image-preview-container">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Imagen ${index + 1}`}
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
          </div>
        )}
      </div>
    </>
  );
};

export default ProductForm;