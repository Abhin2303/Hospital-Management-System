import axios from "axios"
import React, { useState } from 'react'
import { toast } from "react-toastify"

const MessageForm = () => {

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [message, setmessage] = useState("")

    const handleMessage = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/api/v1/message/send", { firstname, lastname, phone, email, message }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then(res => {
                toast.success(res.data.message);
                setfirstname("")
                setlastname("")
                setphone("")
                setemail("")
                setmessage("")
            })
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className='container form-component message-form'>
            <h2>Send Us A Message</h2>
            <form onSubmit={handleMessage}>
                <div>
                    <input type="text" placeholder='First Name' value={firstname} onChange={(e) => {
                        setfirstname(e.target.value)
                    }} />
                    <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => {
                        setlastname(e.target.value)
                    }} />
                </div>
                <div>
                    <input type="number" placeholder='Phone Number' value={phone} onChange={(e) => {
                        setphone(e.target.value)
                    }} />
                    <input type="email" placeholder='yourname@example.com' value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }} />
                </div>
                <textarea rows={5} placeholder='Message' value={message} onChange={(e) => {
                    setmessage(e.target.value)
                }} />
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit'>Send</button>
                </div>
            </form >
        </div >
    )
}

export default MessageForm
