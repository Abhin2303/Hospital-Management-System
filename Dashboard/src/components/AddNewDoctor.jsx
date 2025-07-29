import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNewDoctor = () => {

    const departmentsArray = [
        "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT",
    ]

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
    const [doctorDepartment, setdoctorDepartment] = useState("")
    const [docAvatar, setdocAvatar] = useState("")
    const [docAvatarPreview, setdocAvatarPreview] = useState("")

    const navigateTo = useNavigate();


    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setdocAvatarPreview(reader.result)
            setdocAvatar(file)
        }
    }


    const handleAddNewDoctor = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("firstname", firstname)
            formdata.append("lastname", lastname)
            formdata.append("email", email)
            formdata.append("phone", phone)
            formdata.append("aadhar", aadhar)
            formdata.append("dob", dob)
            formdata.append("gender", gender)
            formdata.append("password", password)
            formdata.append("confirmPassword", confirmPassword)
            formdata.append("doctorDepartment", doctorDepartment)
            formdata.append("docAvatar", docAvatar)

            const response = await axios.post("http://localhost:4000/api/v1/user/doctor/addnew", formdata, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
                .then((response) => {
                    toast.success(response.data.message);
                    setisAuthenticated(true);
                    // navigateTo("/");
                    setfirstname("");
                    setlastname("");
                    setphone("")
                    setemail("");
                    setpassword("");
                    setaadhar("");
                    setdob("");
                    setgender("");
                    setconfirmPassword("");
                    setdoctorDepartment("");
                    setdocAvatar("");
                    setdocAvatarPreview("");
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
                <div className='container form-component add-doctor-form'>
                    <img src="/logo.png" alt="logo" className='logo-img' />
                    <h1 className='form-title'>Register a New Doctor</h1>

                    <form onSubmit={handleAddNewDoctor}>

                        <div className="first-wrapper">
                            <div>
                                <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt="Doctor Avatar" />
                            </div>
                        </div>
                        <input type="file" onChange={handleAvatar} />


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
                        <div >
                            <select
                                value={doctorDepartment}
                                onChange={(e) => {
                                    setdoctorDepartment(e.target.value.trim())
                                }} >
                                <option hidden value="">Select Department</option>
                                {
                                    departmentsArray.map((depart, index) => (
                                        <option value={depart} key={index}>{depart}</option>
                                    ))
                                }
                            </select>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <div>
                            <input type="password" placeholder='Set Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} />
                        </div>


                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <button type='submit'>Add Doctor</button>
                        </div>

                    </form>
                </div>
            </section >
        </>
    )
}

export default AddNewDoctor
