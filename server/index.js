import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//components
import cloudinaryRouter from "./routes/cloudinary/routes.js";
import Compile from "./utils/compiler/compile.js";

const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/api", cloudinaryRouter);

/* app.use("/api/auth", authRouter); */

app.use("/api/compile", async (req, res) => {
  const program = req.body;
    const data = await Compile(program);
  res.status(200).json(data);
});

app.listen(port, () => console.log(`Running on port - ${port}`));
