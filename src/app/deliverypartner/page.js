'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";
import './page.css';

const Page = () => {
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    const [showLogin, setShowLogin] = useState(true); // 👈 Toggle state

    const router = useRouter();

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (delivery) {
            router.push('/deliverydashboard');
        }
    }, []);

    const handleSignUp = async () => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
            method: 'POST',
            body: JSON.stringify({ name, mobile, password, city, address })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard');
        } else {
            alert("Signup failed");
        }
    };

    const loginHandle = async () => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
            method: 'POST',
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        });
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard');
        } else {
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>

            <div className="auth-container">
                {/* Login Form */}
                {showLogin && (
                    <div className="login-wrapper">
                        <h3>Login</h3>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter mobile" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} className="input-field" />
                        </div>
                        <div className="input-wrapper">
                            <input type="password" placeholder="Enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input-field" />
                        </div>
                        <div className="input-wrapper">
                            <button onClick={loginHandle} className="button">Login</button>
                        </div>

                        {/* Switch to Signup */}
                        <p className="switch-message">
                            Don’t have an account? <span onClick={() => setShowLogin(false)} className="switch-link">Signup</span>
                        </p>
                    </div>
                )}

                {/* Signup Form */}
                {!showLogin && (
                    <div className="signup-wrapper">
                        <h3>Signup</h3>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile" />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                        </div>
                        <div className="input-wrapper">
                            <button onClick={handleSignUp} className="button">Signup</button>
                        </div>

                        {/* Switch to Login */}
                        <p className="switch-message">
                            Already have an account? <span onClick={() => setShowLogin(true)} className="switch-link">Login</span>
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Page;
