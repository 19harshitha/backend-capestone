const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const dotenv = require ('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.listen (process.env.Port, () => {
    console.log(`server is running on port ${process.env.Port}`)
})