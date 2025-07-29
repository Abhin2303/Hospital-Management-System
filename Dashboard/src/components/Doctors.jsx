import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main"
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


const Doctors = () => {

    const [doctors, setdoctors] = useState([])
    const { isAuthenticated } = useContext(Context)


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true });
                setdoctors(data.doctors);
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchDoctors();
    }, [])

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <section className='page doctors'>
                <h1>Doctors List</h1>
                <div className="banner">
                    {
                        doctors && doctors.length > 0 ? (doctors.map((elem, index) => {
                            return (
                                <div className="card" key={index}>
                                    <img src={elem.docAvatar && elem.docAvatar.url} alt="Doctor Avatar" />
                                    <h4>{`${elem.firstname}`} {`${elem.lastname}`}</h4>
                                    <div className="details">
                                        <p>Email: <span>{elem.email}</span></p>
                                        <p>Phone: <span>{elem.phone}</span></p>
                                        <p>Aadhar Number: <span>{elem.aadhar}</span></p>
                                        <p>Gender: <span>{elem.gender}</span></p>
                                        <p>DOB: <span>{elem.dob.substring(0, 10)}</span></p>
                                        <p>Department: <span>{elem.doctorDepartment}</span></p>
                                    </div>
                                </div>
                            )
                        })) : <h1>No Registered Doctors Found</h1>
                    }
                </div>
            </section>


        </>
    )
}

export default Doctors
