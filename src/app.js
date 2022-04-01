const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getData = require('../controller/customerController')
const customerRoute = require('../route/customerRoute')

app.use(bodyParser.json());

//endpoints of routes to get data 
app.use('/customers', customerRoute)

app.listen(8080, () => {
  console.log("Server is running on 8080");
});

