import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/job-portal')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

const PORT =3000;

// apis

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});