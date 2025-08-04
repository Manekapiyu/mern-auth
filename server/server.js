// server.js or app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import userAuth from './middleware/userAuth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Working base route
app.get('/', (req, res) => {
  res.send('API running');
});

// ✅ Authenticated route
app.get('/api/auth/is-auth', userAuth, (req, res) => {
  res.json({ success: true, message: 'User authenticated', userId: req.userId });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
