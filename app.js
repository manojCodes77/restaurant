const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

require('dotenv').config();
app.use(bodyParser.json());//parse the json data in the request body

// import the router files
const personRouter = require('./routes/person');
const menuRouter = require('./routes/menu');

// use the router files
app.use('/person',personRouter);
app.use('/menu',menuRouter);


app.listen(PORT, () => {
    console.log('Server is running');
});