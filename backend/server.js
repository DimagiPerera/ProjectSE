import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB.js";

dotenv.config();
const app = express();

//Server running port
const PORT = 8070;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Connecting to the Database
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Import Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

import notesRoutes from "./routes/noteRoutes.js";
app.use("/notes", notesRoutes);
