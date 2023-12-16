import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Model from "./Model";
import Cart from "../Screens/Cart";
import { useCart, useDispatchCart } from "./ContextReducer";




export default function NavBar() {

const data=useCart();
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/")
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1" to="/">
              Ankit Food Corner
            </Link>
            <Link className="navbar-brand" to="/"></Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 ">
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/">
                    Features
                  </Link>
                </li>

                {localStorage.getItem("authtoken") ? (

                  <li className="nav-item">

                    <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                      My Orders
                    </Link>
                  </li>
                ) : null}
              </ul>
              {!localStorage.getItem("authtoken") ? (
                <div className="nav-item d-flex" >
                  <Link className=" btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to="/sign-up">
                    Sign Up
                  </Link>
                </div>
              ) : (<>
                <div className="btn bg-white text-success mx-1">
                  Welcome, {localStorage.getItem("Name")}!
                </div>
                <div className="btn bg-white text-success mx-1">
                  <div onClick={() => { setcartView(true) }}>My Cart <Badge pill bg='danger'>{data.length}</Badge></div>
                </div>
                {cartView ? (
                  <Model onClose={() => setcartView(false)}><Cart /> </Model>
                ) : ""}
                <div className="btn bg-white text-danger mx-1" onClick={handlelogout}>Logout</div>

              </>)}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
