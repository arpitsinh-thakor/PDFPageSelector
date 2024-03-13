const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
  // Connecting to the database
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }); 
}