import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';

dotenv.config(); // Load .env variables
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Check JWT secret is loaded

const app = express();
const PORT = process.env.PORT || 4000;
// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.get('/', (req, res) => res.send("API working"));

// Auth routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
