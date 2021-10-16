import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//socket
import { createServer } from "http";
import { Server } from "socket.io";

//components
import cloudinaryRouter from "./routes/cloudinary/routes.js";
import Compile from "./utils/compiler/compile.js";
import Socket from "./middleware/socket/socket.js";

//app config
const app = express();
const port = process.env.port || 8000;

//socket config
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

//middleware
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//api endpoints
app.use("/api", cloudinaryRouter);

/* app.use("/api/auth", authRouter); */

app.use("/api/compile", async (req, res) => {
  const program = req.body;
  const data = await Compile(program);
  res.status(200).json(data);
});

//socket
Socket(io);

//listner
httpServer.listen(port, () => console.log(`Running on port - ${port}`));
