import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'



const Messages = () => {

    const [messages, setmessages] = useState([])

    const { isAuthenticated } = useContext(Context)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/message/getall", { withCredentials: true });
                setmessages(data.messages);
                // toast.success(res.data.message); // 6.13hrs
            } catch (error) {
                // toast.error(error.response.data.message)
                console.log("error")
            }
        }
        fetchMessages();
    })

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return (
        <section className='page messages'>
            <h1>Messages</h1>
            <div className="banner">
                {
                    messages && messages.length > 0 ? (messages.map((elem, index) => {
                        return (
                            <div className="card" key={index}>
                                <div className="details">
                                    <p>First Name: <span>{elem.firstname}</span></p>
                                    <p>Last Name: <span>{elem.lastname}</span></p>
                                    <p>Email: <span>{elem.email}</span></p>
                                    <p>Phone Number: <span>{elem.phone}</span></p>
                                    <p>Message: <span>{elem.message}</span></p>
                                </div>
                            </div>
                        )
                    })) : (<h1> No Messages</h1>)
                }
            </div>
        </section>
    )
}

export default Messages
