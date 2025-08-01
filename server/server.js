import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import morgan from 'morgan'; // optional
import userRouter from './routes/userRoutes.js';


dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Confirm env is loaded

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

const allowedOrigins = ['http://localhost:5173']
// Middleware
app.use(express.json());
app.use(cors({
  origin: allowedOrigins, // your frontend
  credentials: true
}));
app.use(cookieParser());

// API Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server started on PORT: ${PORT}`);
});
