import express from "express";
import { config } from "dotenv";
import db, { mongoURL } from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import messageRouter from "./router/messageRouter.js";
import UserRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// Load env vars
config({ path: "./config/config.env" });

// Middleware for connecting Frontend and Backend
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
app.use("/api/v1/message", messageRouter); // http://localhost:4000/api/v1/message/
app.use("/api/v1/user", UserRouter); // http://localhost:4000/api/v1/user/patient/
app.use("/api/v1/appointment", appointmentRouter); // http://localhost:4000/api/v1/user/appointemnt/

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to our Hospital');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});



app.use(errorMiddleware); //should be used at end only
export default app;
