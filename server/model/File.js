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
    cloudinary_id: {
        type: String,
    },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;