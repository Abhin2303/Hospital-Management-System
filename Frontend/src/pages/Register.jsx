import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {

    const { isAuthenticated, setisAuthenticated } = useContext(Context);

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [aadhar, setaadhar] = useState("")
    const [dob, setdob] = useState("")
    const [gender, setgender] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const navigateTo = useNavigate();

    const handleRegisteration = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/api/v1/user/patient/register", { firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, role: "Patient" }, { withCredentials: true, headers: { "Content-Type": "application/json" } })
                .then((res) => {
                    toast.success(res.data.message);
                    setisAuthenticated(true);
                    navigateTo("/");
                    setfirstname("");
                    setlastname("");
                    setemail("");
                    setpassword("");
                    setaadhar("");
                    setdob("");
                    setgender("");
                    setpassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='container form-component register-form'>
            <h2>Sign Up</h2>
            <p>Please Sign Up</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur pariatur minima harum, quibusdam nisi vero.</p>

            <form onSubmit={handleRegisteration}>

                <div>
                    <input type="text" placeholder='First Name' value={firstname} onChange={(e) => { setfirstname(e.target.value) }} />
                    <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => { setlastname(e.target.value) }} />
                </div>

                <div>
                    <input type="number" placeholder='Phone Number' value={phone} onChange={(e) => { setphone(e.target.value) }} />
                    <input type="number" placeholder='Aadhar card Number' value={aadhar} onChange={(e) => { setaadhar(e.target.value) }} />
                </div>

                <div>
                    <input type="Date" placeholder='Date of Birth' value={dob} onChange={(e) => { setdob(e.target.value) }} />
                    <select type="text" placeholder='Gender' value={gender} onChange={(e) => { setgender(e.target.value) }} >
                        <option hidden value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className='three'>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type="password" placeholder='Set Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} />
                </div>

                <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                    <p style={{ marginBottom: 0 }}>Already Registered?</p>
                    <Link to={"/login"} style={{ testDecoration: "none", alignItems: "center" }}>Log In</Link>
                </div>

                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit'>Register</button>
                </div>

            </form>
        </div>
    )
};


export default Register
