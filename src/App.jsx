import { Route, Routes, Navigate } from "react-router-dom";

import Header from "../src/Components/Header";
import Footer from "./Components/footer";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Detail from "./Pages/Detail";

import "./App.css";
import LoginForm from "./Components/LoginForm";
import { routes } from "./Components/utils/routes";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <div className="d-flex">
        <Header />
        <div className="background-image"></div>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.admin} element={<Admin />} />
          <Route path={routes.detail} element={<Detail />} />
          <Route path={routes.login} element={<Login></Login>} />
          <Route path={routes.register} element={<Register></Register>} />
          <Route path="*" element={<Navigate to={routes.home} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
