const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());//parse the json data in the request body

// import the router files
const personRouter = require('./routes/person');
const menuRouter = require('./routes/menu');

// use the router files
app.use('/person',personRouter);
app.use('/menu',menuRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});