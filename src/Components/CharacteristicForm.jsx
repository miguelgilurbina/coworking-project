import React, {useState} from 'react'
import "../Styles/Form.css"
import axios from 'axios';
const CharacteristicForm = () => {
    const [name, setName] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8080/api/login', formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        console.log(name,selectedImages);
      };
      return (
        <>  
        <div className="containerForm characteristicsForm" onSubmit={handleSubmit}>
            <form action="">
            <label htmlFor="name">Characteristic Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
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
            <div className="containerButton">
                <button type="submit" >Send</button>
            </div>
            </form>
            </div>
        </>
        
      )
      
}

export default CharacteristicForm