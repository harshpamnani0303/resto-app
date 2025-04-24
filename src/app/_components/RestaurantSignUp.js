'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RestaurantSignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_Password, setC_Password] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter()

    const handleSignUp = async () => {

        if (password !== c_Password) {
            setPasswordError(true)
            return false
        }
        else {
            setPasswordError(false)
        }
        if (!email || !password || !name || !city || !address || !restaurantName || !contact) {
            setError(true)
            return false
        }
        else {
            setError(false)
        }

        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify({
                email, password, name, city, address, restaurantName, contact
            }),
        })
        response = await response.json()
        console.log(response);
        if (response.succuess) {
            console.log(response);

            const { result } = response
            delete result.password
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard")
        }
    }
    return (
        <>
            <h3>SignUP componente</h3>
            <div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    {error && !email && <span className='input-error'>Email is required</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="input-field"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    {error && !name && <span className='input-error'>Name is required</span>}   
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter Restaurent Name"
                        className="input-field"
                        value={restaurantName}
                        onChange={(e) => {
                            setRestaurantName(e.target.value)
                        }}
                    />
                    {error && !restaurantName && <span className='input-error'>Restaurant Name is required</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter city"
                        className="input-field"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                    />
                    {error && !city && <span className='input-error'>City is required</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter Full Address"
                        className="input-field"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    />
                    {error && !address && <span className='input-error'>Address is required</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter contact No."
                        className="input-field"
                        value={contact}
                        onChange={(e) => {
                            setContact(e.target.value)
                        }
                        }
                    />
                    {error && !contact && <span className='input-error'>Contact is required</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    {passwordError && <span className='input-error'>Password and Confirm password not match</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input-field"
                        value={c_Password}
                        onChange={(e) => {
                            setC_Password(e.target.value)
                        }}
                    />

                    {passwordError && <span className='input-error'>Password and Confirm password not match</span>}
                </div>

                <div className="input-wrapper">
                    <button className="button" onClick={handleSignUp}>Sign UP</button>
                </div>
            </div>
        </>
    );
}

export default RestaurantSignUp;

