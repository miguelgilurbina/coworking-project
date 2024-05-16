import { Route, Routes, Navigate } from "react-router-dom";

import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer"
import Form from "../src/Components/Form";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import { routes } from "./Utils/routes";
import "./App.css";
import Detail from "./Pages/Detail"

function App() {
  return (
    <>
      <div className="app ">
        <Header />
        <div class="background-image"></div>

        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.admin} element={<Detail />} />
          <Route path="*" element={<Navigate to={routes.home} />} />
        </Routes>
        {/* <Home/> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
