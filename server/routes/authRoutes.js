import express from "express";
import { register, login, logout } from "../controllers/authController.js"; // Import login & logout too

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login); // Add login function
authRouter.post('/logout', logout); // Add logout function

export default authRouter; // ✅ Ensure this is default export
