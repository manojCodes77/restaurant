const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');

// set the view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();
app.use(bodyParser.json());//parse the json data in the request body

// import the router files
const personRouter = require('./routes/person');
const menuRouter = require('./routes/menu');

// use the router files
app.get("/", (req, res) => {
    res.render('index');
});
app.use('/person',personRouter);
app.use('/menu',menuRouter);


app.listen(PORT, () => {
    console.log('Server is running');
});