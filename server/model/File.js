const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;