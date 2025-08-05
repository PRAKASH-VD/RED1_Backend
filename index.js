import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/dbConfig.js';
import authRoute from './Routers/authRoute.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.status(200).send("Helow");
});

app.use("/api/auth", authRoute);

const port=process.env.PORT || 4000;

app.listen(port,()=>{
        console.log(`Server is Running On Port ${port}`);
});

