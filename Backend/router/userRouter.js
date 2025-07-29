import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
const UserRouter = express.Router();

UserRouter.post("/patient/register", patientRegister);
//http://localhost:4000/api/v1/user/patient/register

UserRouter.post("/login", login);
//http://localhost:4000/api/v1/user/login

UserRouter.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
//http://localhost:4000/api/v1/user/admin/addnew

UserRouter.get("/doctors", getAllDoctors);
//http://localhost:4000/api/v1/user/doctors

UserRouter.get("/admin/me", isAdminAuthenticated, getUserDetails);
//http://localhost:4000/api/v1/user/admin/me

UserRouter.get("/patient/me", isPatientAuthenticated, getUserDetails);
//http://localhost:4000/api/v1/user/patient/me

UserRouter.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
//http://localhost:4000/api/v1/user/admin/logout

UserRouter.get("/patient/logout", isPatientAuthenticated, logoutPatient);
//http://localhost:4000/api/v1/user/patient/logout

UserRouter.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
//http://localhost:4000/api/v1/user/doctor/addnew



export default UserRouter;