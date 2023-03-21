import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product"
import authRouter from "./routes/product"


const app = express();


app.use(express.json());

app.use("/api",productRouter);
app.use("/api",authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/nodejs17302");

export const viteNodeApp = app;

