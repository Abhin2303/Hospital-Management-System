import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { GoCheckCircleFill } from "react-icons/go"
import { AiFillCloseCircle } from "react-icons/ai"
import { toast } from 'react-toastify'


const Dashboard = () => {

    const { isAuthenticated, user } = useContext(Context)

    const [appointments, setappointments] = useState([])
    const [doctors, setdoctors] = useState([]);
    const [messages, setmessages] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Appointments
                const appointmentRes = await axios.get("http://localhost:4000/api/v1/appointment/getall", { withCredentials: true });
                setappointments(appointmentRes.data.appointments);

                // Doctors
                const doctorsRes = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true });
                setdoctors(doctorsRes.data.doctors);

                // Messages
                const messagesRes = await axios.get("http://localhost:4000/api/v1/message/getall", { withCredentials: true });
                setmessages(messagesRes.data.messages);
            } catch (error) {
                setappointments([])
                console.log("Error fetching dashboard data", error);
            }
        };

        fetchAllData();
    }, []);


    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }


    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(`http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );

            setappointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );

            toast.success(data.message || "Appointment status updated!");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
    }



    return (
        <>
            <section className="dashboard page">
                <div className="banner">
                    <div className="firstbox">
                        <img src="/Admin.png" alt="adminImg" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>
                                    {user && `${user.firstname} ${user.lastname}`}
                                </h5>
                            </div>
                            <p>Welcome to the Admin Dashboard where you can view all the detals of Doctors, Appointments, Messages from Patients , etc..</p>
                        </div>
                    </div>
                </div>
                <div className="box-row secondbox">
                    <div >
                        <p>Total Appointments</p>
                        <h3>{appointments.length}</h3>
                    </div>
                    <div >
                        <p>Registered Doctors</p>
                        <h3>{doctors.length}</h3>
                    </div>
                    <div >
                        <p>Total Messages</p>
                        <h3>{messages.length}</h3>
                    </div>
                </div>
                <h2>Appointments</h2>
                <div className="banner appointments-banner">
                    <div className="table-wrapper">

                        <table>
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Departent</th>
                                    <th>Status</th>
                                    <th>Visited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments && appointments.length > 0 ? (
                                    appointments.map((appointment) => (
                                        <tr key={appointment._id}>
                                            <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                                            <td>{appointment.appointment_date.substring(0, 10)}</td>
                                            <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                                            <td>{appointment.department}</td>
                                            <td>
                                                <select
                                                    className={
                                                        appointment.status === "Pending"
                                                            ? "value-pending"
                                                            : appointment.status === "Rejected"
                                                                ? "value-rejected"
                                                                : "value-accepted"
                                                    }
                                                    value={appointment.status}
                                                    onChange={(e) =>
                                                        handleUpdateStatus(appointment._id, e.target.value)
                                                    }
                                                >
                                                    <option value="Pending" className="value-pending">Pending</option>
                                                    <option value="Accepted" className="value-accepted">Accepted</option>
                                                    <option value="Rejected" className="value-rejected">Rejected</option>
                                                </select>
                                            </td>
                                            <td>
                                                {appointment.hasVisited ? (
                                                    <GoCheckCircleFill className="green" />
                                                ) : (
                                                    <AiFillCloseCircle className="red" />
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                            No Appointments Registered
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Dashboard
