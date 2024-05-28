import { useState } from "react";
import '../Styles/Form.css';
import axios from 'axios'

const ProductForm = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity:'',
    price:'',
    selectedImages:[]
  });

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0 ) {
      // Aqui convierte la lista de archivos en un array
      const newImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 

  

  return (
    <>

      {/* <div className="containerForm" onSubmit={handleSubmit}>

          
          <form >
          <h2>Welcome administrator </h2>
          <p>Enter the details of the new salon</p>
              <label htmlFor="name">Name </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

              <label htmlFor="description">Description </label>
              <textarea 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} hplaceholder="Description" />

              <label htmlFor="price">Price </label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

              <label htmlFor="quantity">Number of people </label>        
              <input type="number" id="quatity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Number of people" />
              
              <h4>Categories</h4>
              <div className="containerCheckbox">
                <label htmlFor="">
                <input type="checkBox"/>
                  Private Office
                </label>
                <label htmlFor="">
                <input type="checkBox"/>
                Meeting Room
                </label>
                <label htmlFor="">
                  <input type="checkBox"/>
                Full Time
                </label>
                <label htmlFor="">
                <input type="checkBox"/>
                Lounge
                </label>
              </div>
              <h4>Characteristics</h4>
              <div className="containerCheckbox">
              <label htmlFor="">
                <input type="checkBox"/>
                Wifi
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Sillas Ergonomicas
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Aire Libre
              </label>
              <label htmlFor="">
                <input type="checkBox"/>  
                Aire Acondicionado
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Proyector
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Pizarra
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Sala Recreativa
              </label>
              <label htmlFor="">
                <input type="checkBox"/>
                Cafeteria
              </label>
              </div>
              <div className="containerButton">
                <button type="submit" >Send</button>
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
                {selectedImages.length > 0 && selectedImages.length < 6  &&  (
                  <div >
                    <p>Selected images</p>
                    {selectedImages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Imagen ${index + 1}`}
                        style={{
                          width:250, height:190,padding:"0px 5px"
                          
                        }}
                      />
                    ))}
                  </div>
                )}
          </div>             
      </div> */}
      
    </>
    
    

  );
}

export default ProductForm;

