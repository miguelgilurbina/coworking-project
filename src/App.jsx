import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Form from "./Components/Form"
import Home from './Pages/Home'
import './App.css'
import Detail from "./Pages/Detail"
import LoginForm from "./Components/LoginForm"

function App() {


  return (
    <>
      <Header/>
      <Home/>
      {/* <Detail/> */}
      {/* <LoginForm/> */}
      <Form/>
      <Footer/>
     
    </>
  )
}

export default App
