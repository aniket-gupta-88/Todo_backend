import express from "express"
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import { DB_CONNECT } from "./utils/Constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors'

const app = express();

app.use(cors());

mongoose.connect
    ( DB_CONNECT)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });

const PORT = 8000;

app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware ,apiProtected);

app.listen(PORT, ()=> console.log(`server is running on ${PORT}`)) 
