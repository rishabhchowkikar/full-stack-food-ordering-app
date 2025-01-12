import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";

import menuRouter from "./routes/menuRoute.js";
import path from "path";
import { connectToDatabase } from "./libs/database.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../food_app_frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../food_app_frontend", "dist", "index.html")
    );
  });
}
app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
  connectToDatabase();
});
