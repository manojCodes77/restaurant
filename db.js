//it is responsible for establishing the connection between the server and the database.
const mongoose = require('mongoose');

// define the mongoDB connection string
// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL="mongodb+srv://msr:jai_uk@cluster0.hvfgsgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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