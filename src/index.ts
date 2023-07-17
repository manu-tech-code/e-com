import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import categoryRoutes from './routes/Category/categoryRoutes'
import subCategoryRoutes from './routes/Category/subCategoryRoutes'
require("dotenv/config");

const app = express()
app.use(cors());
app.use(express.json());


const db = mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });

const port: any = process.env.PORT || 3000;
const baseUrl: string = process.env.BASE_URL || '';

app.use(`${baseUrl}`, authRoutes)
app.use(`${baseUrl}`, userRoutes)
app.use(`${baseUrl}`, adminRoutes)
app.use(`${baseUrl}`, categoryRoutes)
app.use(`${baseUrl}`, subCategoryRoutes)

// 404 route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Endpoint does not exist' })
    next()
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    db
}); 