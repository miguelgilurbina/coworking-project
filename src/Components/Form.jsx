import { useState } from "react";
import '../Styles/Form.css'
const Form = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se envian los datos al servidor (hacer logica )
    console.log({ name, description, quantity, price, image });
  };

  return (
    <>

      <div className="containerForm">
          <h2>Welcome administrator </h2>
          <p>Enter the details of the new salon</p>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <div className="formContent">
                  <label for="quantity">Number of people </label>        
                  <input type="number" id="quatity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Number of people" />
              </div>                  
            </div>
            <div className="formGroup">
              <div className="formContent">
                  <label for="price">Price </label>
                  <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /> 
              </div>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Enviar</button>
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