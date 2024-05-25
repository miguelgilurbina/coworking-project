import { BrowserRouter, Form, Route, Routes  } from 'react-router-dom';
import './App.css'
import MuiDataTables from 'mui-datatables'
import { routes } from "./Components/utils/routes"
import Header from "./Components/Header"
import Footer from "./Components/footer"
import Home from './Pages/Home'
import Register from "./Pages/Register"
import Admin from "./Pages/Admin"
import TableEditRooms from "./Pages/TableEditRooms"
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"
import EditProducts from './Components/EditProducts';
import CharacteristicForm from './Components/CharacteristicForm';
import ProductForm from './Components/ProductForm';


function App() {


  return (
    <>
      <div className='app-container'>
        <Header/>
        <Routes>
            <Route path={routes.login} element={<LoginForm></LoginForm>} />
            <Route path={routes.register} element={<Register></Register>}/> 
            <Route path={routes.admin} element={<Admin/>}/> 
            <Route path={routes.editRoom} element={<TableEditRooms/>}/>  
            <Route path={routes.detail} element={<Detail/>}/>
            <Route path={routes.home} element={<Home/>}/>
            <Route path={routes.editRoom} element={<EditProducts/>}/>
            <Route path={routes.characteristicForm} element={<CharacteristicForm/>}/>
            <Route path={routes.productForm } element={<ProductForm></ProductForm>}></Route>
        </Routes>
        <Footer/>
        </div>
    </>
  )
}

export default App
