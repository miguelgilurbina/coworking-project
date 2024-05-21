import { useState } from "react";
import '../Styles/Form.css'


const Form = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  /* const [image, setImage] = useState([]); */
  

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // Convierte la lista de archivos en un array
      const newImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };



  /* const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se envian los datos al servidor (hacer logica )
    console.log({ name, description, quantity, price, selectedImages});
  };

  

  return (
    <>

      <div className="containerForm">
          <h2>Welcome administrator </h2>
          <p>Enter the details of the new salon</p>
          <form onSubmit={handleSubmit}>
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

              
                <label htmlFor="images">Upload images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  id="images"
                />
                {selectedImages.length > 0 && (
                  <div >
                    <p>Selected images</p>
                    {selectedImages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Imagen ${index + 1}`}
                        style={{
                          width:250, height:250,padding:"0px 5px"
                          
                        }}
                      />
                    ))}
                  </div>
                )}
              

          </form>

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