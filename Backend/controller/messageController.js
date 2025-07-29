import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { errorHandler } from "../middlewares/errorMiddleware.js"


export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    // console.log("🔥 Incoming message request");
    // console.log("Headers:", req.headers);
    // console.log("Raw Body:", req.body);

    // Just to prevent crash
    if (!req.body || typeof req.body !== "object") {
        return next(new errorHandler("req.body is missing or invalid", 400))
    }

    // Now destructure safely
    const { firstname, lastname, email, phone, message } = req.body;

    if (!firstname || !lastname || !email || !phone || !message) {
        return next(new errorHandler("Please Fill Full Form", 400))
    }

    await Message.create({ firstname, lastname, email, phone, message });

    res.status(200).json({
        success: true,
        message: "Message sent Successfully",
        message
    });

})


export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find()
    res.status(200).json({
        success: true,
        messages,
    })
})
