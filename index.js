import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import authRoute from "./Routers/authRoute.js";
import propertyRoute from "./Routers/propertyRoute.js";
import cartRoute from "./Routers/cartRoutes.js";
import bookingRoute from "./Routers/bookingRoute.js";
import paymentRoute from "./Routers/paymentRoute.js";
import inquiryRoute from "./Routers/inquiryRoutes.js";
import appointmentRoute from "./Routers/appointmentRoute.js";
import userRoutes from "./Routers/userRoutes.js";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.status(200).send("Helow");
});

app.use("/api/auth", authRoute);
app.use("/api/properties", propertyRoute);
app.use("/api/cart", cartRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/inquiries", inquiryRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));



const port=process.env.PORT;

app.listen(port,()=>{
        console.log(`Server is Running On Port ${port}`);
});


