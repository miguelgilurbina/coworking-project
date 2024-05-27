import React from "react"
import "../Styles/admin.css"
import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <div className="AdminPage">
      <h1>Hi Administrator!</h1>
      <h3>What do you want to do today?</h3>
      <div className="AdminOptions">
      <Link to="/form" className="button option"> Add New Product</Link>
      <Link to="/addCharacteristic" className="button option">Add New Characteristic</Link>
      <Link to="/editRoom" className="button option">Edit Existing Room</Link>
      </div>
    </div>
    
  )
}

export default Admin