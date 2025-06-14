'use client'

import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import './page.css'; // Assuming you have a CSS file for styles
const Page = () => {
    const [cartData, setCartData] = useState(null);
    const [removeCartData, setRemoveCartData] = useState(null);
    const [cartIds, setCartIds] = useState([]);

    const [cartStorage, setCartStorage] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        return storedCart || [];
    });

    const [total, setTotal] = useState(() => {
        if (cartStorage.length === 1) {
            return cartStorage[0].price;
        } else if (cartStorage.length > 1) {
            return cartStorage.reduce((a, b) => a.price + b.price);
        } else {
            return 0;
        }
    });

    const router = useRouter();

    // ✅ Redirect to home if cart is empty
    useEffect(() => {
        if (cartStorage.length === 0) {
            router.push('/');
        }
    }, [cartStorage]);

    const orderNow = () => {
        if (JSON.parse(localStorage.getItem('user'))) {
            router.push('/order');
        } else {
            router.push('/user-auth?order=true');
        }
    };

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        const updatedCart = cartStorage.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartStorage(updatedCart);

        const updatedTotal = updatedCart.reduce((a, b) => a + b.price, 0);
        setTotal(updatedTotal);

        const updatedIds = cartIds.filter(item => item !== id);
        setCartIds(updatedIds);
        setCartData(); // still okay if you're using it for header sync
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div className="food-list-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((item) => (
                        <div className="list-item" key={item._id}>
                            <div className="list-item-block-1"><img style={{ width: 100 }} src={item.img_path} /></div>
                            <div className="list-item-block-2">
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                            </div>
                            <div className="list-item-block-3">Price: {item.price}</div>
                        </div>
                    )) : <h1>No Food Items for this Restaurant</h1>
                }
            </div>
            
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{(total * TAX / 100).toFixed(2)}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges  : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Page;
