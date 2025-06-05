'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CustomerHeader = ({ cartData, removeCartData }) => {
    const [cartNumber, setCartNumber] = useState(0);

    const updateCart = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartNumber(newCart.length);
    };

    // Load cart count on first load
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartNumber(cart.length);
    }, []);

    // Handle Add to Cart
    useEffect(() => {
        if (!cartData) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if different restaurant
        if (cart.length > 0 && cart[0].resto_id !== cartData.resto_id) {
            cart = [cartData];
            alert("Cart has been reset because you selected items from a different restaurant.");
        } else {
            // Avoid duplicates
            const exists = cart.find(item => item._id === cartData._id);
            if (!exists) {
                cart.push(cartData);
            }
        }

        updateCart(cart);
    }, [JSON.stringify(cartData)]); // Ensures effect runs even with same structure

    // Handle Remove from Cart
    useEffect(() => {
        if (!removeCartData) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item._id !== removeCartData);

        updateCart(cart);
    }, [JSON.stringify(removeCartData)]); // Fix: stringified to track changes properly

    return (
        <div className='header-wrapper'>
            <div className='logo'>
                <h1>logo</h1>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Login</Link></li>
                <li><Link href="/">SignUp</Link></li>
                <li><Link href="/">Cart ({cartNumber})</Link></li>
                <li><Link href="/">Add Restaurant</Link></li>
            </ul>
        </div>
    );
};

export default CustomerHeader;
