import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const { isAuthenticated, setisAuthenticated } = useContext(Context);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login page render, isAuthenticated:", isAuthenticated);

        try {
            await axios.post("http://localhost:4000/api/v1/user/login", { email, password, role: "Patient" }, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((res) => {
                toast.success(res.data.message);
                setisAuthenticated(true);
                // console.log("Login success: setting isAuthenticated to true");
                navigateTo("/");
                setemail("");
                setpassword("");
            });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='container form-component login-form'>

            <h2>Sign In</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat sequi enim repudiandae quia maiores dolorem.</p>

            <form onSubmit={handleLogin}>

                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />

                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='password' />

                <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                    <p style={{ marginBottom: 0 }}>Not Registered?</p>
                    <Link to={"/register"} style={{ testDecoration: "none", alignItems: "center" }}>Register Now</Link>
                </div>

                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit'>Login</button>
                </div>

            </form>
        </div>
    )
}

export default Login
