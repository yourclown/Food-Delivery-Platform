import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import Card from "../components/Card";



export default function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setsearch] = useState([]);


  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/fooddata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFoodCategory(data[1]);
      setFoodItem(data[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div id="carouselExampleIndicators" className="carousel slide container stretched-image mt-2 " data-bs-ride="carousel" >

        <div className="carousel-indicators ">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <div className="d-flex mt-5 mb-lg-4 justify-content-center " style={{ zIndex: "10" }}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              value={search} onChange={(e) => { setsearch(e.target.value) }} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </div>
        </div>


        <div className="carousel-inner " id="crousalid" style={{ objectFit: "contain !important" }}>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random" className=" ank d-block w-100 col-12 col-md-6 col-lg-3" alt="ank"></img>
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300" className="ank d-block w-100 col-12 col-md-6 col-lg-3 " alt="ank"></img>
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?fruit" className=" ank  w-100 col-12 col-md-6 col-lg-3 " alt="ank"></img>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="m-9 mt-4  container ">
        {foodCategory.length !== 0 ? (
          foodCategory.map((category) => (
            <div key={category._id} className="mb-3 text-body-bold " style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {category.CategoryName}
              <hr />
              <div className="row">
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLowerCase())))

                    .map((item) => (
                      <div key={item._id} className="col-12 col-md-6 col-lg-3">
                        <div>
                          <Card foodName={item}
                            options={item.options[0]}
                           
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div>lodaaaa</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>lodaaaa</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );

}
