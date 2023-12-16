import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className="text-center mt-5 fs-3 w-100 m-5">
                The Cart is empty
            </div>
        );
    }
    const handlecheckout = async () => {
        let useremail = localStorage.getItem("Email");
        let response = await fetch("http://localhost:4000/api/orderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data,
                email: useremail,
                order_date: new Date().toDateString(),
            }),
        });

        // Log the response data
        const responseData = await response.json();
        console.log(responseData);

        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }
    };


    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Options</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button
                                    type="button"
                                    className='btn p-0'
                                    onClick={() => {
                                        dispatch({ type: "REMOVE", index: index });
                                    }}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h1 className='fs-2'>Total Price: {totalPrice}</h1>
            </div>
            <div>
                <div className='btn btn-bg-success mt-5' onClick={handlecheckout}>Check Out</div>
            </div>
        </div>
    );
}
