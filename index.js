const express = require("express");
const cors = require('cors');
const connection = require("../agrilinks/connection");
const app = express();
const port = 5000;


app.use(cors());
app.use(express.urlencoded({ extended: true }));   // to read the data from the body
app.use(express.json()) 

connection();   // establishing database connection 
app.listen(port,()=>{console.log(`running on ${port}`) });

const reportRouter = require('./Routes/report');
app.use('/reports',reportRouter);
