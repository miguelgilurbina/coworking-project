import Header from "../src/Components/Header"
import Footer from "../src/Components/footer"

import Home from './Pages/Home'
import './App.css'
import Detail from "./Pages/Detail"

function App() {


  return (
    <>
      <Header/>
      <Home/>
      {<Detail/>}
      <Footer/>
     
    </>
  )
}

export default App
