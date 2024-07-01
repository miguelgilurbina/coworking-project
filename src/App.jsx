import { Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./Components/Context/AuthContext";

import { FavoriteProvider } from "./Components/Context/FavoriteContext";

import { BookingProvider } from "./Components/Context/BookingContext";

import { routes } from "./Components/utils/routes";


import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Detail from "./Pages/Detail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TableEditRooms from "./Pages/TableEditRooms";
import Profile from "./Pages/Profile";

import Header from "../src/Components/Header";
import Footer from "./Components/footer";
import LoginForm from "./Components/LoginForm";
import EditProducts from "./Components/EditProducts";
import CharacteristicForm from "./Components/CharacteristicForm";
import ProductForm from "./Components/ProductForm";
import UsersList from "./Components/UsersList";
import CategoryForm from "./Components/CategoryForm";
import CategoryList from "./Components/CategoryList";
import FavoriteList from "./Components/FavoriteList";
import ProductList from "./Components/ProductList";
import Booking from "./Components/Booking";
import BookingForm from "./Components/BookingForm";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <FavoriteProvider>
          <BookingProvider>
        <div className="d-flex">
          <Header />
          <div className="background-image"></div>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.admin} element={<Admin />} />
            <Route path={`${routes.detail}/:id`} element={<Detail />} />
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
            <Route path={routes.usersList} element={<UsersList />} />
            <Route path="*" element={<Navigate to={routes.home} />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.addCategory} element={<CategoryForm />}></Route>
            <Route path={routes.categoryList} element={<CategoryList/>}></Route>
            <Route path={routes.favoriteList} element={<FavoriteList/>}></Route>
            <Route path={routes.productList} element={<ProductList/>}></Route>
            <Route path={`${routes.booking}/:id`} element={<Booking />} />
            <Route path={routes.bookingForm} element={<BookingForm/>}></Route>
          </Routes>
        </div>
        <Footer />
        </BookingProvider>
        </FavoriteProvider>
      </AuthProvider>
    </>
  );
}

export default App;