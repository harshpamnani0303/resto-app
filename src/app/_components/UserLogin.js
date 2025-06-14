'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './UserLogin.css'; // Assuming you have a CSS file for styling
const UserLogin = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async () => {
        console.log({ email, password });

        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
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
            alert('user login ')
        }
        else {
            alert('failed ')
        }

    }
    return (
        <div className="form-container">
            <div className="input-wrapper">
                <input
                    type="email"
                    className="input-field"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="input-label">Email</label>
            </div>

            <div className="input-wrapper">
                <input
                    type="password"
                    className="input-field"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="input-label">Password</label>
            </div>

            <div className="input-wrapper">
                <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>

    );
}

export default UserLogin;