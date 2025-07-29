import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { errorHandler } from "../middlewares/errorMiddleware.js"
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary"


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    if (!req.body || typeof req.body !== "object") {
        return next(new errorHandler("req.body is missing or invalid", 400))
    }

    const { firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, role } = req.body;

    if (!firstname || !lastname || !email || !phone || !aadhar || !dob || !dob || !gender || !password || !confirmPassword || !role) {
        return next(new errorHandler("Please Fill Full Form", 400))
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("Password and Confirm Password not Matched", 400))
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new errorHandler("User is already Registered", 400))
    }

    user = await User.create({ firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, role });


    generateToken(user, "User Registered Successfully!", 200, res)

});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new errorHandler("Please provide all details", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new errorHandler("Invalid Password or Email", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Password", 400))
    }

    if (role !== user.role) {
        return next(new errorHandler(`User with this role not found`, 404))
    }

    generateToken(user, "User logged-in Successfully.", 200, res)

})


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {

    const { firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !phone || !aadhar || !dob || !dob || !gender || !password || !confirmPassword) {
        return next(new errorHandler("Please Fill Full Form", 400))
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("Password and Confirm Password not Matched", 400))
    }

    const isadmin = await User.findOne({ email });
    if (isadmin) {
        return next(new errorHandler(`Admin with email:${email} Already Registered`, 400))
    }
    const admin = User.create({ firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, role: "Admin" })


    res.status(200).json({
        success: true,
        message: "A new Admin Registered.",
        admin
    })
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors
    })
})


export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged out successfully"
    })
})

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Logged out successfully"
    })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new errorHandler("Doctor Avatar Required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new errorHandler("File Format not Supported!", 400));
    }

    const { firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, doctorDepartment } = req.body;

    if (!firstname || !lastname || !email || !phone || !aadhar || !dob || !dob || !gender || !password || !confirmPassword || !doctorDepartment) {
        return next(new errorHandler("Please Fill Full Form", 400))
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("Password and Confirm Password not Matched", 400))
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new errorHandler(`${isRegistered.role} already registered with this email`, 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    console.log(cloudinaryResponse);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error : ", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }

    const doctor = await User.create({
        firstname, lastname, email, phone, aadhar, dob, gender, password, confirmPassword, doctorDepartment, role: "Doctor", docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Registered",
        doctor
    });
});