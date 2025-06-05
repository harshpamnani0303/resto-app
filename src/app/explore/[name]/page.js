'use client'

import CustomerHeader from '@/app/_components/CustomerHeader';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const Page = () => {
  const { name } = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [foodItems, setFoodItems] = useState([]);

  const [cartData, setCartData] = useState(null);
  const [removeCartData, setRemoveCartData] = useState(null);

  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  // Utility to safely get cart array from localStorage
  const getCartFromStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart'));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  };

  // Load localStorage safely after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCart = getCartFromStorage();
      setCartStorage(localCart);
      setCartIds(localCart.map(item => item._id));
    }
  }, []);

  // Load restaurant info once ID is available
  useEffect(() => {
    if (id) loadRestaurantDetails();
  }, [id]);

  const loadRestaurantDetails = async () => {
    const response = await fetch("http://localhost:3000/api/customer/" + id);
    const data = await response.json();
    if (data.success) {
      setRestaurantDetails(data.details);
      setFoodItems(data.foodItems);
    }
  };

  const addToCart = (item) => {
        let localCartIds=cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds)
        setCartData(item)
        setRemoveCartData();

    }

    const removeFromCart=(id)=>{
        setRemoveCartData(id);
        var localIds=cartIds.filter(item=>item!=id);
        setCartData()
        setCartIds(localIds)
    }

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

      <div className="restaurant-page-banner">
        <h1>{decodeURIComponent(name)}</h1>
      </div>

      <div className="deatil-wrapper">
        <h3>Contact : {restaurantDetails?.contact}</h3>
        <h3>City : {restaurantDetails?.city}</h3>
        <h3>Address : {restaurantDetails?.address}</h3>
        <h3>Email : {restaurantDetails?.email}</h3>
      </div>

      <div className='food-item-wrapper'>
        {foodItems.length > 0 ? (
          foodItems.map(item => (
            <div className='list-item' key={item._id}>
              <div>
                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>Price : {item.price}</div>
                <div className='description'>{item.description}</div>

                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No food items available</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
