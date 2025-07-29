import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaLocationArrow } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const Footer = () => {

    const hours = [
        { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
        { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
        { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
        { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
        { id: 5, day: "Monday", time: "3:00 PM - 9:00 PM" },
        { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
        { id: 7, day: "Sunday", time: "9:00 AM - 1:00 PM" },
    ];


    return (
        <>
            <footer className='container'>
                <hr />
                <div className="content">
                    <div>
                        <img src="logo.png" alt="logo" className='logo-img' />
                    </div>
                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to={"/"}>Home</Link></li>
                            <li><Link to={"/appointment"}>Appointment</Link></li>
                            <li><Link to={"/about"}>About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Hours</h4>
                        <ul className='hours'>
                            {
                                hours.map((element => {
                                    return (
                                        <li key={element.id}>
                                            <span>{element.day}</span>
                                            <span>{element.time}</span>
                                        </li>
                                    )
                                }))
                            }
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <div>
                            <FaPhone />
                            <span>999-999-9999</span>
                        </div>
                        <div>
                            <MdEmail />
                            <span>Support@AbhiCare.com</span>
                        </div>
                        <div>
                            <FaLocationArrow />
                            <span>Chandrapur, India</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
