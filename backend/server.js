import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()
const app = express();
const PORT = process.env.PORT

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to Db,server is listening to port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.json())


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


