'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    const router = useRouter()
    const handleSignUp = async () => {
        console.log({
            name,
            email,
            password,
            confirmPassword,
            city,
            address,
            mobile

        });

        let response = await fetch('http://localhost:3000/api/user', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password,
                city,
                address,
                mobile
            })
        })

        response = await response.json()
        if (response.success) {
            const { result } = response
            delete result.password
            localStorage.setItem('user', JSON.stringify(result))
            if (props?.redirect?.order) {
                router.push('/order')
            } else {
                router.push('/')
            }
            alert('user signUp done')
        }
        else {
            alert('Sign UP not done ')
        }

    };
    return (
        <div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div >
            <div className="input-wrapper">
                <input
                    type="email"
                    className="input-field"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <input
                    type="password"
                    className="input-field"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <input
                    type="password"
                    className="input-field"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <input
                    type="tel"
                    className="input-field"
                    placeholder="Enter Mobile Number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <button onClick={handleSignUp} className="button">SignUp</button>
            </div>

        </div>
    )
}

export default UserSignUp;