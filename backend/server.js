import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// const cors = require('cors');
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express();
const PORT = process.env.PORT 

const allowedOrigins = ['https://mern-app-2.vercel.app/'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to Db,server is listening to port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const msg = err.message || 'Server err'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        msg
    })
})


