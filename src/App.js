import React from "react";
import Home from "./Screens/Home";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./Screens/Cart";
import MyOrder from "./Screens/MyOrder";


const App = () => {


  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/sign-up" element={<SignUp />}></Route>
            <Route exact path="/myorder" element={<MyOrder />}></Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};
export default App;
