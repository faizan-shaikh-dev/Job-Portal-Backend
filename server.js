import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js'

const app = express();

dotenv.config();
connectDB()

app.use(cors());
app.use(express.json());

//Base Url
app.get('/', (req, res)=>{
    res.send('Server is Running');
});

app.use('/api/users', authRoutes);
app.use('/api/jobs', jobsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`); 
});
