import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    password: {
        type: String,
        minLength: [8, "Password must contain at-least 8 characters!"],
        required: true,
        select: false
    },
    confirmPassword: {
        type: String,
        minLength: [8, "Confirm Password should be same as Password"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = this.password;
    next();
});


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES, })
}
export const User = mongoose.model("User", userSchema);