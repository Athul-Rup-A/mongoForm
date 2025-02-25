require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./dB/db')
userRoute = require('./routes/userRoute')
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api', userRoute)
app.use("/uploads", express.static("uploads"));

db()

app.listen(PORT, () => {
    console.log(`server runnung on http://localhost:${PORT}`);
})
