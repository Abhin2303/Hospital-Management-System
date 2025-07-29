import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewDoctor from "./components/AddNewDoctor";
import { Context } from './main';
import Sidebar from './components/Sidebar';
import './App.css';


const App = () => {
  const { setisAuthenticated, user, setuser } = useContext(Context);
  // console.log(user.firstname)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {
          withCredentials: true
        });
        setisAuthenticated(true);
        setuser(response.data.user);
      } catch (err) {
        setisAuthenticated(false);
        setuser({});
        console.log(user)
      }
    };

    fetchUser();
  }, [setisAuthenticated, setuser]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/admin/addnew' element={<AddNewAdmin />} />
        <Route path='/doctor/addnew' element={<AddNewDoctor />} />
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
  );
};

export default App;
