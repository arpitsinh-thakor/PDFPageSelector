const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");

//localfileupload -> handler function for file upload
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from req
        const file = req.files.file;
        console.log("file -> " + file);

        //create path for file
        let path = __dirname + '/files/' + `${file.name}`;
        console.log("path -> " + path);

        //move file to path
        file.mv(path, (err)=>{
            console.log(err);
        });
       
        res.json({
            success: true,
            msg: 'File uploaded successfully'
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.mergePdfs = async (req, res) => {
    try{
        const {file1, file2} = req.files;
        const file1Buffer = readFileSync(file1.tempFilePath);
        const file2Buffer = readFileSync(file2.tempFilePath);

        const pdfDoc1 = await PDFDocument.load(file1Buffer);
        const pdfDoc2 = await PDFDocument.load(file2Buffer);

        const pdfDoc = await PDFDocument.create();
        const copiedPages = await pdfDoc.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
        copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
        });
        const copiedPages2 = await pdfDoc.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
        copiedPages2.forEach((page) => {
            pdfDoc.addPage(page);
        });

        const mergedPdf = await pdfDoc.save();

        const path = __dirname + '/mergedFiles/' + `${file1.name.split('.')[0]}&${file2.name.split('.')[0]}` + '.pdf';
        
        writeFileSync(path, mergedPdf);
        
        res.json({
            success: true,
            msg: 'Pdf merged successfully'
        });

    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.selectedPagesByIndex = async (req, res) => {
    try{
        const file = req.files.file;
        const ind = req.body.indexes;
        const indexes = ind.split(',').map(Number);
        const fileBuffer = readFileSync(file.tempFilePath);
        const pdfDoc = await PDFDocument.load(fileBuffer);
        
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, indexes);
        copiedPages.forEach((page) => {
            newPdf.addPage(page);
        });
       
        const path = __dirname + '/selectedByIndexFiles/' + `.${file.name.split('.')[0]}` + '.pdf';

        const pdfBytes = await newPdf.save();
        writeFileSync(path, pdfBytes);

        res.json({
            success: true,
            msg: 'Selected pages extracted successfully'
        });
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.getPdf = async (req, res) => {
    try{
        const file = req.query.fileName;
        const path = __dirname + '/files/' + file + '.pdf';
        res.download(path);
    }
    catch(error){
        res.status(500).send(error);
    }
}
    