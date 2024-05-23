import Header from "../src/Components/Header"
import Footer from "../src/Components/footer"

import Home from './Pages/Home'
import './App.css'
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"
import { routes } from "./Components/utils/routes"
import { Route, Routes  } from 'react-router-dom';
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Admin from "./Pages/Admin"

function App() {


  return (
    <>
      <Header/>
      <Home/>
      {/* <Detail/> */}
      {/* <LoginForm/> */}
      <Routes>
          <Route path={routes.login} element={<Login></Login>} />
          <Route path={routes.register} element={<Register></Register>}/> 
          <Route path={routes.admin} element={<Admin/>}/>    

      </Routes>
      
      <Footer/>
     
    </>
  )
}

export default App
