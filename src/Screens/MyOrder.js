import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({ email: '', order_data: [] });

  const fetchMyOrder = async () => {
    const email = localStorage.getItem('Email');
    const response = await fetch('http://localhost:4000/api/myorderdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      setOrderData(responseData.orderData);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="container">
        <div className="row">
        {Array.isArray(orderData.order_data) && orderData.order_data.length > 0 ? (
  orderData.order_data.map((arrayData, arrayIndex) => {
    const orderDate = arrayData[0].Order_date;
    const item = arrayData[1];

    return (
      <div key={arrayIndex}>
        {orderDate ? (
          <div className="m-auto mt-5">
            {orderDate}
            <div className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="card bg-info mt-1 d-flex" style={{ width: "16rem", maxHeight: "360px" }}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <span className="m-1">Quantity: {item.qty}</span>
                  <br />
                  <span className="m-1">Size: {item.size}</span>
                  <br />
                  <span className="m-1">Order Date: {orderDate}</span>
                  <br />
                  <div className="d-inline ms-2 h-100 w-20 fs-5">
                    <b>Total Amount</b>: ₹{item.price}/-
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  })
) : (
  <p>No order data available.</p>
)}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
