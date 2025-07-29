import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js"


const appointmentRouter = express.Router();

appointmentRouter.post("/post", isPatientAuthenticated, postAppointment)
// http://localhost:4000/api/v1/appointment/post

appointmentRouter.get("/getall", isAdminAuthenticated, getAllAppointments)
// http://localhost:4000/api/v1/appointment/getall

appointmentRouter.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus)
// http://localhost:4000/api/v1/appointment/update/:

appointmentRouter.delete("/delete/:id", isAdminAuthenticated, deleteAppointment)
// http://localhost:4000/api/v1/appointment/delete/:

export default appointmentRouter;