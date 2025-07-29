import mongoose from 'mongoose'
import validator from 'validator'

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at-least 10 Characters!"],
    }
});

export const Message = mongoose.model("Message", messageSchema);