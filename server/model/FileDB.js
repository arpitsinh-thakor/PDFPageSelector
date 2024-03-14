const mongoose = require('mongoose');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },

});

const FileDB = mongoose.model('FileDB', fileSchema);
module.exports = FileDB;