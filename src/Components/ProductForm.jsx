import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa"; 
import IsMobile from "./IsMobile";
import '../Styles/Form.css';
import axios from 'axios'

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        if (name === 'category') {
          setCategory((prevCategory) => [...prevCategory, value]);
        } else if (name === 'characteristics') {
          setCharacteristics((prevCharacteristics) => [...prevCharacteristics, value]);
        }
      } else {
        if (name === 'category') {
          // setCategory((prevCategory) => prevCategory.filter((item) => item !== value));
        } else if (name === 'characteristics') {
          // setCharacteristics((prevCharacteristics) => prevCharacteristics.filter((item) => item !== value));
        }
      }
    } else {
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'quantity':
          setQuantity(value);
          break;
        case 'price':
          setPrice(value);
          break;
        default:
          break;
      }
    }
 
  };
  const isMobile = IsMobile();
  const handleImageDelete = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image, i) => i !== index)
    );
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name,
      description,
      quantity,
      price,
      selectedImages: selectedImages.map(file => file.name), // If you need to send image names
      category,
      /*characteristics,*/
    };

    try {
      const response = await axios.post("http://localhost:8080/salas/registrar", dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
     
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };  return (
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
                  <button className="genericButton" type="submit" onClick={handleSubmit}>
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
          </div>
        )}
      </div>
    </>
  );
};

export default ProductForm;


