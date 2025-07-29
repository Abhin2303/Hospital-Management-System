import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js"
const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);
// http://localhost:4000/api/v1/message/send

messageRouter.get("/getall", isAdminAuthenticated, getAllMessages);
// http://localhost:4000/api/v1/message/getall


export default messageRouter;
