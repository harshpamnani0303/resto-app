'use client'
import Link from "next/link"

import './style.css'

const DeliveryHeader = (props) => {


    return (

        <div className="header-wrapper">
            <div className="logo">
                <span className="logo-text">FoodHub</span>
            </div>
            <ul>
                <li>
                    <Link href="/" >Home</Link>
                </li>
            </ul>
        </div>
    )
}

export default DeliveryHeader