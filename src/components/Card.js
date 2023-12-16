import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import Swal from 'sweetalert2';

export default function Card(props) {
    const pricerefrence = useRef();
    const dispatch = useDispatchCart();
    const data = useCart();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]); // Initialize size with the first option

    // Initialize with the first option

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodName._id) {
                food = item;
                break;
            }
        }
        Swal.fire({
            title: 'Good job!',
            text: 'Item successfully addeed',
            icon: 'success',
          });
          

        // console.log(food);
        // console.log(new Date());

        const finalPrice = qty * parseInt(options[size]);
        console.log(finalPrice);

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodName._id, price: finalPrice, qty: qty });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodName._id, name: props.foodName.name, price: finalPrice, qty: qty, size: size });
                console.log("Size different so simply ADD one more to the list");
                return;
            }
            return;
        }

        await dispatch({ type: "ADD", id: props.foodName._id, name: props.foodName.name, price: finalPrice, qty: qty, size: size });
    }

 

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodName.img} className="card-img-top" alt="paneer" style={{ width: "285px", height: "150px" }}></img>
                <div className="card-body">
                    <h5 className="card-title">{props.foodName.name}</h5>
                    <p className="card-text"></p>
                    <div className="container w-100">
                        <select className="m-2 h-100 rounded-1" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className="m-2 h-100 rounded-1" ref={pricerefrence} style={{ backgroundColor: 'lightblue', color: 'black' }} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5"> ₹{qty * parseInt(options[size])}/-</div>
                        <hr></hr>
                        <button className="btn btn-primary justify-content-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
