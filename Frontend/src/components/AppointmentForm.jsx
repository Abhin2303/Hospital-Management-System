import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const AppointmentForm = () => {
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [aadhar, setaadhar] = useState("")
    const [dob, setdob] = useState("")
    const [gender, setgender] = useState("")
    const [appointmentDate, setappointmentDate] = useState("")
    const [department, setdepartment] = useState("")
    const [doctorFirstname, setdoctorFirstname] = useState("")
    const [doctorLastname, setdoctorLastname] = useState("")
    const [address, setaddress] = useState("")
    const [hasVisited, sethasVisited] = useState(false)


    const navigateTo = useNavigate()

    const departmentsArray = [
        "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT",
    ]

    const [doctors, setdoctors] = useState([])

    useEffect(() => {
        const fetchDoctors = async () => {
            const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true })
            // console.log("Fetched doctors:", data.doctors)
            setdoctors(data.doctors)
            // console.log(data.doctor);
        }
        fetchDoctors()
    }, [])

    const handleAppointment = async (e) => {
        e.preventDefault()

        try {

            const hasVisitedBool = Boolean(hasVisited)
            const { data } = await axios.post("http://localhost:4000/api/v1/appointment/post", { firstname, lastname, email, phone, aadhar, dob, gender, appointment_date: appointmentDate, department, doctor_firstname: doctorFirstname, doctor_lastname: doctorLastname, address, hasVisited: hasVisitedBool },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                })

            toast.success(data.message)
            navigateTo("/")
        } catch (error) {
            toast.error(error.response.data.message)
        }


    }

    const filteredDoctors = Array.isArray(doctors)
        ? doctors.filter(doc => doc.doctorDepartment === department)
        : [];
    // console.log("Selected Department:", department);

    // console.log("Filtered doctors:", filteredDoctors)

    // console.log("Doctors list:", doctors);

    return (
        <div className='container form-component appointment-form'>
            <h2>Appointment</h2>
            <p>Please Fill the Appointment Form</p>

            <form onSubmit={handleAppointment}>
                <div>
                    <input type="text" placeholder='First Name' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                    <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => setlastname(e.target.value)} />
                </div>

                <div>
                    <input type="text" placeholder='Phone Number' value={phone} onChange={(e) => setphone(e.target.value)} />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />
                </div>

                <div>
                    <input type="text" placeholder='Aadhar card Number' value={aadhar} onChange={(e) => setaadhar(e.target.value)} />
                    <select value={gender} onChange={(e) => setgender(e.target.value)} >
                        <option hidden value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <input type="date" placeholder='Date of Birth' value={dob} onChange={(e) => setdob(e.target.value)} />
                    <input type="date" placeholder='Select Appointment Date' value={appointmentDate} onChange={(e) => setappointmentDate(e.target.value)} />
                </div>

                <div>
                    <select
                        value={department}
                        onChange={(e) => {
                            setdepartment(e.target.value.trim())
                            setdoctorFirstname("")
                            setdoctorLastname("")
                        }} >
                        <option hidden value="">Select Department</option>
                        {
                            departmentsArray.map((depart, index) => (
                                <option value={depart} key={index}>{depart}</option>
                            ))
                        }
                    </select>

                    <select
                        value={`${doctorFirstname} ${doctorLastname}`.trim()}
                        onChange={(e) => {
                            const [firstname, ...lastnameParts] = e.target.value.split(" ")
                            setdoctorFirstname(firstname)
                            setdoctorLastname(lastnameParts.join(" "))
                        }}
                        disabled={!department}>
                        <option hidden value="">Select Doctor</option>

                        {
                            filteredDoctors.length === 0 ? (
                                <option disabled>No doctors available</option>
                            ) : (
                                filteredDoctors.map((doc) => (
                                    <option value={`${doc.firstname} ${doc.lastname}`} key={doc._id}>
                                        {doc.firstname} {doc.lastname}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>
                <textarea
                    rows="3"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Address"
                />
                <div
                    style={{
                        gap: "10px",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}
                >
                    <p style={{ marginBottom: 0 }}>Have you visited before?</p>
                    <input
                        type="checkbox"
                        checked={hasVisited}
                        onChange={(e) => sethasVisited(e.target.checked)}
                        style={{ flex: "none", width: "25px" }}
                    />
                </div>

                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit'>Book Appointment</button>
                </div>
            </form>
        </div>
    )
}

export default AppointmentForm
