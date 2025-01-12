import express from "express";
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItem,
  updateMenuItem,
} from "../controllers/menuController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const menuRouter = express.Router();

menuRouter.get("/menu-item", getAllMenuItem);

menuRouter.post("/add-menu-item", protectedRoute, addMenuItem);

menuRouter.put("/update-menu-item/:id", protectedRoute, updateMenuItem);

menuRouter.delete("/delete-menu-item/:id", protectedRoute, deleteMenuItem);

export default menuRouter;
