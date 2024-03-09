const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pdfRoutes = require('./routes/pdfRoutes');
require('dotenv').config()
const app = express();
const port = 3000;
const path = require('path')

// app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.URI)

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/v1', pdfRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});