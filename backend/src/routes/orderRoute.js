import express from "express";
import { placeOrder, getUserOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", placeOrder);

orderRouter.get("/get-user-order", getUserOrder);

export default orderRouter;
