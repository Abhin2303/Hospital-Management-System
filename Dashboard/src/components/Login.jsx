import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {

    const { isAuthenticated, setisAuthenticated } = useContext(Context);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login page render, isAuthenticated:", isAuthenticated);

        try {
            await axios.post("http://localhost:4000/api/v1/user/login", { email, password, role: "Admin" }, { withCredentials: true, headers: { "Content-Type": "application/json" } }).then((res) => {
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
        <>
            <div className='container form-component'>
                <img src="../../../logo.png" alt="logo" className='logo-img' />
                <h1 style={{ paddingTop: 20 }} className='form-title'>Welcome to AbhiCare</h1>
                <p>Only For Admins</p>
                <form onSubmit={handleLogin}>

                    <input type="text" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />

                    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='password' />

                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type='submit'>Login</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login
