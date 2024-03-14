import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    const [loading, setLoading] = useState(false);
    const data = useCart();
    const dispatch = useDispatchCart();

    const handleCheckOut = async () => {
        setLoading(true);
        try {
            const userEmail = localStorage.getItem("userEmail");
            const response = await fetch('http://localhost:5000/api/orderData', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            if (response.status === 200) {
                dispatch({ type: 'DROP' });
            } else {
                // Handle non-200 status code, e.g., display an error message
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error, e.g., display an error message
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={food.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type='button' className='btn p-0'><img src='' alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-success'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut} disabled={loading}> {loading ? 'Checking Out...' : 'Check Out'} </button>
                </div>
            </div>
        </div>
    );
}