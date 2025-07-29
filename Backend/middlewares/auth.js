import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { errorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {        //Authentication
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new errorHandler("Admin not Authenticated", 400));
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Admin") {        //Authorization
            return next(new errorHandler(`${req.user.role} is not Authorized for accessing this.`, 403));
        }
    }
    next();
})


export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {        //Authentication
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new errorHandler("Patient not Authenticated", 400));
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Patient") {        //Authorization
            return next(new errorHandler(`${req.user.role} is not Authorized for accessing this.`, 403));
        }
    }
    next();
})