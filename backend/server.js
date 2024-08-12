import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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


