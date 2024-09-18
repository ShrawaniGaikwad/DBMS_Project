const express = require('express');
const path= require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const api= require('./routes/api');
const port = 3000;

const app= express();
app.use(cors());
app.use('/api',api);
app.use(bodyParser.json());

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});