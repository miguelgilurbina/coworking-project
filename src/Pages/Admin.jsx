import React from "react"
import Form from "../Components/Form"
import "../Styles/admin.css"
import CharacteristicForm from "../Components/CharacteristicForm"

const Admin = () => {
  return (
    <div className="AdminPage">Admin
      <Form></Form>
      <CharacteristicForm></CharacteristicForm>
    </div>
    
  )
}

export default Admin