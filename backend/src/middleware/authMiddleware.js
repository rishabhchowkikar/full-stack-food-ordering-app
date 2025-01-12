import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token_food_app;

    if (!token) {
      return res
        .status(401)
        .json({ message: "UnAuthorised User - No Token Provided" });
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedId) {
      return res
        .status(401)
        .json({ message: "UnAuthorised User - Invalid Token" });
    }

    const user = await User.findById(decodedId.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protected middleware: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
