'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter()

    const handelLogin = async () => {
        if (!email || !password) {
            setError(true);
            return false
        } else {
            setError(false);
        }

        let response = await fetch("http://localhost:3000/api/restaurant" , {
            method: "POST",
            body: JSON.stringify({
                email, password, login: true
            }),
        });
        response = await response.json();
        if (response.succuess) {
            
            console.log(email, password);
            const {result} = response
            delete result.password
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard")
        }
        else{
            alert("Login Failed")
        }
    }

    return (
        <>
            <h3>Login componente</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Email" className="input-field" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                    {
                        error && !email && <span className="input-error">Please enter a valid email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" className="input-field" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                    {
                        error && !password && <span className="input-error">Please enter a valid password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button onClick={handelLogin} className="button">Login</button>
                </div>
            </div>
        </>
    );
}
export default RestaurantLogin;