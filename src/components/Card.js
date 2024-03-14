import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options || {}; 
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  
  const handleAddToCart = async () => {
    let food = []
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({ type: "ADD", id: props.foodItem?._id, name: props.foodItem?.name, price: finalPrice, qty: qty, size: size });
        return
      }
      return
    }
   
  };

  let finalPrice = qty * parseInt(options[size] || 0); 
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
        <img src={props.foodItem?.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem?.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="d-inline h-full  fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center m-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
