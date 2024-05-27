import { Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./Components/Context/AuthContext";

import Header from "../src/Components/Header";
import Footer from "./Components/footer";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Detail from "./Pages/Detail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TableEditRooms from "./Pages/TableEditRooms";

import LoginForm from "./Components/LoginForm";
import EditProducts from "./Components/EditProducts";
import CharacteristicForm from "./Components/CharacteristicForm";
import ProductForm from "./Components/ProductForm";
import { routes } from "./Components/utils/routes";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="d-flex">
          <Header />
          <div className="background-image"></div>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.admin} element={<Admin />} />
            <Route path={routes.detail} element={<Detail />} />
            <Route path={routes.login} element={<Login></Login>} />
            <Route path={routes.login} element={<LoginForm></LoginForm>} />
            <Route path={routes.register} element={<Register></Register>} />
            <Route path={routes.editRoom} element={<EditProducts />} />
            <Route
              path={routes.characteristicForm}
              element={<CharacteristicForm />}
            />
            <Route
              path={routes.productForm}
              element={<ProductForm></ProductForm>}
            ></Route>
            <Route path={routes.editRoom} element={<TableEditRooms />} />

            <Route path="*" element={<Navigate to={routes.home} />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
