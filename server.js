const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const dotenv = require ('dotenv')
const auth = require('./routes/reg_log')
const jobs = require('./routes/job_rou')
dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(auth,jobs);

//health api
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


app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  });

//error handler
   app.use((err, req, res, next) => {

    res
      .status(500)
      .json({ error: "Something went wrong! Please try after some time." });
  });
 
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
    mongoose
    .connect(mongodb_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    console.log(`server is running on port ${PORT}`)
})
.catch((err) => console.log("failed to connect" ,err) )
});