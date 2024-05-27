<<<<<<<<< Temporary merge branch 1
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "../src/Components/Header";
import Footer from "./Components/Footer";
import Form from "../src/Components/Form";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Detail from "./Pages/Detail";

import { routes } from "./Utils/routes";
import "./App.css";
=========
import Header from "../src/Components/Header"
import Footer from "../src/Components/footer"

import MuiDataTables from 'mui-datatables'
import { AuthProvider } from "./Components/Context/AuthContext";
import TableEditRooms from "./Pages/TableEditRooms"
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"
import EditProducts from './Components/EditProducts';
import CharacteristicForm from './Components/CharacteristicForm';
import ProductForm from './Components/ProductForm';
import Home from './Pages/Home'
import './App.css'
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"
import { routes } from "./Components/utils/routes"
import { Route, Routes  } from 'react-router-dom';
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Admin from "./Pages/Admin"
>>>>>>>>> Temporary merge branch 2

function App() {
  return (
    <>
<<<<<<<<< Temporary merge branch 1
      <div className="d-flex">
        <Header />
        <div className="background-image"></div>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.detail} element={<Detail />} />
          <Route path={routes.login} element={<Login></Login>} />
            <Route path={routes.register} element={<Register></Register>} />
          <Route path={routes.editRoom} element={<TableEditRooms/>}/>  
          <Route path={routes.editRoom} element={<EditProducts/>}/>
          <Route path={routes.characteristicForm} element={<CharacteristicForm/>}/>
            <Route path={routes.productForm } element={<ProductForm></ProductForm>}></Route>

          <Route path="*" element={<Navigate to={routes.home} />} />
        </Routes>
        {/* <Home/> */}
      </div>
      <Footer />
=========
      <Header/>
      {/* <Detail/> */}
      {/* <LoginForm/> */}
      <Routes>
          <Route path={routes.login} element={<Login></Login>} />
          <Route path={routes.register} element={<Register></Register>}/> 
          <Route path={routes.admin} element={<Admin/>}/>    
          <Route path={routes.detail} element={<Detail/>}/>
          <Route path={routes.home} element={<Home/>}/>

      </Routes>
      
      <Footer/>
     
>>>>>>>>> Temporary merge branch 2
    </>
  );
}

export default App;
