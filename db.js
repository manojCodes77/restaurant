//it is responsible for establishing the connection between the server and the database.
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL;

// define the mongoDB connection string
// const mongoURL = process.env.MONGODB_URL_LOCAL;

// set up the connection
mongoose.connect(mongoURL);

// get the connection object
const db = mongoose.connection;

// define event listeners for the connection
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${mongoURL}`);
});

db.on('error', (error) => {
    console.log(`Database error: ${error}`);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});

// export the connection
module.exports = db;
