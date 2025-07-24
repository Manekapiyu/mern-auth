import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';

dotenv.config(); // Don't forget this line to load .env variables



const app = express();
const PORT = process.env.PORT || 4000;
// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.get('/', (req, res) => res.send("API working"));

// Routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
