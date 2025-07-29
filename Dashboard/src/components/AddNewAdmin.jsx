import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNewAdmin = () => {


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

    const handleAddNewAdmin = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/api/v1/user/admin/addnew", { firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword }, { withCredentials: true, headers: { "Content-Type": "application/json" } })
                .then((res) => {
                    toast.success(res.data.message);
                    navigateTo("/");
                    // setfirstname("");
                    // setlastname("");
                    // setemail("");
                    // setpassword("");
                    // setaadhar("");
                    // setdob("");
                    // setgender("");
                    // setconfirmPassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <section className="page">
                <div className='container form-component add-admin-form'>
                    <img src="/logo.png" alt="logo" className='logo-img' />
                    <h1 className='form-title'>Add New Admin</h1>

                    <form onSubmit={handleAddNewAdmin}>

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


                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <button type='submit'>Add Admin</button>
                        </div>

                    </form>
                </div>
            </section >
        </>
    )
}

export default AddNewAdmin
