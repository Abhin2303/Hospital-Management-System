import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'

const Appointment = () => {
    return (
        <div>
            <Hero title={"Schedule your Appointment | AbhiCare Medical Institte"} imageURL={"/signin.png"} />
            <AppointmentForm />
        </div>
    )
}

export default Appointment
