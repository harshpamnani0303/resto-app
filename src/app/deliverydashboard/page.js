'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";
import './page.css';

const Page = () => {

    const router = useRouter()


    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        getMyOrders()
    }, [])

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem('delivery'));
        let response = await fetch('http://localhost:3000/api/deliverypartners/orders/' + deliveryData._id)
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }


    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner')
        }
    }, [])
    return (
        <div>
            <DeliveryHeader />
            <h1 className="order-title">My Order List</h1>

            {myOrders.map((item, index) => (
                <div className="restaurant-wrapper" key={index}>
                    <h4>Name: <span>{item.data.name}</span></h4>
                    <div>Amount: <span>₹{item.amount}</span></div>
                    <div>Address: <span>{item.data.address}</span></div>
                    <div>Status: <span>{item.status}</span></div>
                    <div>
                        Update Status:
                        <select className="status-select">
                            <option>Confirm</option>
                            <option>On the way</option>
                            <option>Delivered</option>
                            <option>Failed to delivery</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Page;