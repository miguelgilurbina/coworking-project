import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css'
import MuiDataTables from 'mui-datatables'
import { routes } from "./Components/utils/routes"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Form from "./Components/Form"
import Home from './Pages/Home'
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Admin from "./Pages/Admin"
import TableEditRooms from "./Pages/TableEditRooms"
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"




function App() {


  return (
    <>
    
        <Header/>
        {/* <Detail/> */}
        {/* <LoginForm/> */}
        <Routes>
            <Route path={routes.login} element={<Login></Login>} />
            <Route path={routes.register} element={<Register></Register>}/> 
            <Route path={routes.admin} element={<Admin/>}/> 
            <Route path={routes.editRoom} element={<TableEditRooms/>}/>  
            <Route path={routes.detail} element={<Detail/>}/>
            <Route path={routes.home} element={<Home/>}/>

        </Routes>
      
        <Footer/>
    
    </>
  )
}

export default App
