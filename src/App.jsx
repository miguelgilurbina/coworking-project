<<<<<<< HEAD
import Header from "./Components/Header"
import Footer from "./Components/Footer"
=======
import Header from "../src/Components/Header"
import Footer from "../src/Components/footer"

>>>>>>> 43dff90a3c3c2a73c87f8ed9f45f02f72f4d7f6b
import Home from './Pages/Home'
import './App.css'
import Detail from "./Pages/Detail"
import { routes } from "./Components/utils/routes"
import { Route, Routes  } from 'react-router-dom';
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Admin from "./Pages/Admin"

function App() {
  return (
    <>
      <Header/>
      {/* <Detail/> */}
      {/* <LoginForm/> */}
      <Routes>
          <Route path={routes.home} element= {<Home/>}/>
          <Route path={routes.detail} element={<Detail/>}/>
          <Route path={routes.login} element={<Login/>}/>
          <Route path={routes.register} element={<Register/>}/> 
          <Route path={routes.admin} element={<Admin/>}/>    
<<<<<<< HEAD
=======
          <Route path={routes.detail} element={<Detail/>}/>
          <Route path={routes.home} element={<Home/>}/>

>>>>>>> 43dff90a3c3c2a73c87f8ed9f45f02f72f4d7f6b
      </Routes>
      
      <Footer/>
     
    </>
  );
}

export default App;
