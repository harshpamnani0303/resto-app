"use client"
import { useState } from "react"
import RestaurantLogin from "../_components/RestaurantLogin.js"
import RestaurantSignUp from "../_components/RestaurantSignUp.js"
import RestaurantHeader from "../_components/RestaurantHeader"
import Footer from "../_components/Footer.js"
import "./style.css"
const Restaurant = () => {

    const [login, setLogin] = useState(true)

    return (
        <>
            <div className="container">
                <RestaurantHeader />
                <h1>Restaurant Page</h1>
                {
                    login ? <RestaurantLogin /> : <RestaurantSignUp />
                }
                <div>
                    <button className="button-link" onClick={() => setLogin(!login)}>
                        {login ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Restaurant