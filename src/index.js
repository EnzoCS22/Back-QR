import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import QRrouter from './qr.controller.js';

dotenv.config();
const corsoptions = {
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credential: true,
}

const app= express();
app.use(cors(corsoptions));
app.use(express.json());
app.use(QRrouter);

app.listen(process.env.PORT || 3000)
