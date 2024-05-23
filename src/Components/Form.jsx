import { useState } from "react";
import '../Styles/Form.css';
import axios from 'axios'

const Form = () => {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(name,description,quantity,price,selectedImages);
  };

  

  return (
    <>

      <div className="containerForm" onSubmit={handleSubmit}>
          
          <form >
          <h2>Welcome administrator </h2>
          <p>Enter the details of the new salon</p>
              <label htmlFor="name">Name </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

              <label htmlFor="description">Description </label>
              <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

              <label htmlFor="price">Price </label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

              <label htmlFor="quantity">Number of people </label>        
              <input type="number" id="quatity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Number of people" />
              
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
      </div>
      
    </>
    
    

  );
}

export default Form;

/*
******************************************************************* 
codigo java (migue y aldo estan al tanto de mi problema con el pc)

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Servidor {
  public static void main(String[] args) {
    try {
      Class.forName("com.mysql.jdbc.Driver");
      Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/laBaseDeDatos", "user", "password");
      

      ******Aqui irian los datos que se reciben del formulario ******

      String nombre = "nombre del producto"; ***EJEMPLO****
      String descripcion = "descripción del producto"; ***EJEMPLO****
      int cantidad = 10; ***EJEMPLO****
      double precio = 99.99; ***EJEMPLO****

      String query = " insert into productos (name, description, quantity, price)"
        + " values (?, ?, ?, ?)";

      PreparedStatement preparedStmt = con.prepareStatement(query);
      preparedStmt.setString (1, name);
      preparedStmt.setString (2, description);
      preparedStmt.setInt    (3, quantity);
      preparedStmt.setDouble (4, price);

      preparedStmt.execute();

      con.close();
    } catch (Exception e) {
      System.err.println("¡Error! ");
      System.err.println(e.getMessage());
    }
  }
} */