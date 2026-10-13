import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import urlRoutes from "./routes/urlRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/u", urlRoutes);
app.use("/health", healthRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => console.log("MongoDB connection error: ", error));




