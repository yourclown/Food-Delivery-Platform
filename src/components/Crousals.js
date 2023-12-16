import React from 'react'
import "bootstrap/dist/css/bootstrap.css";

export default function Crousals() {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >

                <div className="carousel-indicators align-content-center">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <form className="d-flex mt-4 mb-lg-4 " style={{ zIndex: "10" }}>




                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />




                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>


                <div className="carousel-inner" id="crousalid" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random" className="d-block w-100" alt="ank"></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300" className="d-block w-100" alt="ank"></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?fruit" className="d-block w-100" alt="ank"></img>
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
        </div>
    )
}
