import mongoose, { mongo } from "mongoose";
import validator from 'validator'


const appointmentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exact 10 digits"],
        maxLength: [10, "Phone number must contain exact 10 digits"]
    },
    aadhar: {
        type: String,
        required: true,
        minLength: [12, "Aadhar must contain exact 12 digits"],
        maxLength: [12, "Aadhar must contain exact 12 digits"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    appointment_date: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        default: false

    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);