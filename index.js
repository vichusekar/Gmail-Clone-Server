const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const userRouter = require('./routes/router')
const DB_NAME = 'gmail'
app.use('/', userRouter)

const connection_url =
  `mongodb+srv://root:888333@cluster0.zfpvnmb.mongodb.net/${DB_NAME}`;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = 8000

app.listen(PORT, ()=>console.log(`App running port in ${PORT}` ))