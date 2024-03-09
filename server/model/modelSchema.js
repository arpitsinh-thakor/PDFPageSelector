const mongoose = require('mongoose')

const PdfSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    filename: String,
  });
  
  const Pdf = mongoose.model('Pdf', PdfSchema);

  module.exports = Pdf