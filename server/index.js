require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Database connection
mongoose.connect(process.env.DB,{ useNewUrlParser: true ,useUnifiedTopology: true }, err => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("Connected to DB");
    }
  });

//Api port
var port = process.env.PORT || 3000;

//Router
app.use('/api', apiRoutes);

app.listen(port, function () {
     console.log("Running server on port " + port);
});