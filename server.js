const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const dotenv = require ('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/health', (req,res) => {
    try {
        res.status(200).json({ 
            service: "job-listing-app",
            status: "active",
            time : new Date()
        })
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: 'something went wrong'
        })
    }
    
} )

app.listen (process.env.Port, () => {
    mongoose
    .connect(process.env.mongodb_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    console.log(`server is running on port ${process.env.Port}`)
})
.catch((err) => console.log("failed to connect" ,err) )
});