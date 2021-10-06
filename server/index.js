import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//components
import cloudinaryRouter from "./routes/cloudinary/routes.js";

const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/api", cloudinaryRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Running on port - ${port}`));
