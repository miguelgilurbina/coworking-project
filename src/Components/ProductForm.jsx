import { useState, useEffect } from "react";
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
      const response = await axios.post("https://reqres.in/api/users", dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
     
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit}>
        <h2>Welcome administrator</h2>
        <p>Enter the details of the new salon</p>

        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name"
          value={name} 
          onChange={handleChange} 
          placeholder="Name" 
        />

        <label htmlFor="description">Description</label>
        <textarea 
          name="description"
          value={description} 
          onChange={handleChange} 
          placeholder="Description" 
        />

        <label htmlFor="price">Price</label>
        <input 
          type="number" 
          name="price"
          value={price} 
          onChange={handleChange} 
          placeholder="Price" 
        />

        <label htmlFor="quantity">Number of people</label>
        <input 
          type="number" 
          name="quantity"
          value={quantity} 
          onChange={handleChange} 
          placeholder="Number of people" 
        />

        <h4>Categories</h4>
        <div className="containerCheckbox">
          <label>
            <input 
            type="checkbox" 
            name="category" 
            value="Private Office" 
            onChange={handleChange} />
            Private Office
          </label>
          <label>
            <input 
            type="checkbox" 
            name="category" 
            value="Meeting Room" 
            onChange={handleChange} />
            Meeting Room
          </label>
          <label>
            <input 
            type="checkbox" 
            name="category" 
            value="Full Time" 
            onChange={handleChange} />
            Full Time
          </label>
          <label>
            <input 
            type="checkbox" 
            name="category" 
            value="Lounge" 
            onChange={handleChange} />
            Lounge
          </label>
        </div>

        <h4>Characteristics</h4>
        <div className="containerCheckbox">
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Wifi" 
            onChange={handleChange} />
            Wifi
          </label>
          <label>
            <input 
            type="checkbox"
            name="characteristics" 
            value="Sillas Ergonomicas" 
            onChange={handleChange} />
            Sillas Ergonomicas
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Aire Libre" 
            onChange={handleChange} />
            Aire Libre
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Aire Acondicionado" 
            onChange={handleChange} />
            Aire Acondicionado
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Proyector" 
            onChange={handleChange} />
            Proyector
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Pizarra" 
            onChange={handleChange} />
            Pizarra
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Sala Recreativa" 
            onChange={handleChange} />
            Sala Recreativa
          </label>
          <label>
            <input 
            type="checkbox" 
            name="characteristics" 
            value="Cafeteria" 
            onChange={handleChange} />
            Cafeteria
          </label>
        </div>

        <div className="containerButton">
          <button type="submit">Send</button>
        </div>
      </form>

      <div className="image-preview">
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
            <p>Selected images</p>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Imagen ${index + 1}`}
                style={{ width: 250, height: 190, padding: "0px 5px" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductForm;


